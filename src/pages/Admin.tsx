import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, Briefcase, Code, Mail, Settings, Plus, Trash2, Edit, 
  Save, X, Check, Eye, EyeOff, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string | null;
  display_order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

type Tab = 'skills' | 'projects' | 'messages' | 'settings';

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('skills');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Backend', level: 80 });
  const [newProject, setNewProject] = useState({ 
    title: '', description: '', tech_stack: '', github_url: '', live_url: '' 
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    const [skillsRes, projectsRes, messagesRes] = await Promise.all([
      supabase.from('skills').select('*').order('display_order'),
      supabase.from('projects').select('*').order('display_order'),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ]);

    if (skillsRes.data) setSkills(skillsRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    const { error } = await supabase.from('skills').insert({
      name: newSkill.name,
      category: newSkill.category,
      level: newSkill.level,
      display_order: skills.length,
    });

    if (error) {
      toast.error('Failed to add skill');
      return;
    }

    toast.success('Skill added successfully');
    setNewSkill({ name: '', category: 'Backend', level: 80 });
    setIsAddingSkill(false);
    fetchData();
  };

  const handleUpdateSkill = async (skill: Skill) => {
    const { error } = await supabase
      .from('skills')
      .update({ name: skill.name, category: skill.category, level: skill.level })
      .eq('id', skill.id);

    if (error) {
      toast.error('Failed to update skill');
      return;
    }

    toast.success('Skill updated');
    setEditingSkill(null);
    fetchData();
  };

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete skill');
      return;
    }
    toast.success('Skill deleted');
    fetchData();
  };

  const handleAddProject = async () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast.error('Please fill in title and description');
      return;
    }

    const { error } = await supabase.from('projects').insert({
      title: newProject.title,
      description: newProject.description,
      tech_stack: newProject.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
      github_url: newProject.github_url || null,
      live_url: newProject.live_url || null,
      display_order: projects.length,
    });

    if (error) {
      toast.error('Failed to add project');
      return;
    }

    toast.success('Project added successfully');
    setNewProject({ title: '', description: '', tech_stack: '', github_url: '', live_url: '' });
    setIsAddingProject(false);
    fetchData();
  };

  const handleUpdateProject = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack,
        github_url: project.github_url,
        live_url: project.live_url,
      })
      .eq('id', project.id);

    if (error) {
      toast.error('Failed to update project');
      return;
    }

    toast.success('Project updated');
    setEditingProject(null);
    fetchData();
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete project');
      return;
    }
    toast.success('Project deleted');
    fetchData();
  };

  const handleToggleMessageRead = async (id: string, read: boolean) => {
    await supabase.from('contact_messages').update({ read: !read }).eq('id', id);
    fetchData();
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete message');
      return;
    }
    toast.success('Message deleted');
    fetchData();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="glass-card p-8 text-center max-w-md">
          <h1 className="text-2xl font-display font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges. Please contact the site owner to request access.
          </p>
          <Button variant="hero" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'skills' as Tab, label: 'Skills', icon: Code },
    { id: 'projects' as Tab, label: 'Projects', icon: Briefcase },
    { id: 'messages' as Tab, label: 'Messages', icon: Mail, count: messages.filter(m => !m.read).length },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
            <h1 className="text-xl font-display font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'hero' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="relative"
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
              {tab.count && tab.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold">Manage Skills</h2>
              <Button variant="hero" onClick={() => setIsAddingSkill(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>

            {isAddingSkill && (
              <div className="glass-card p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Skill name"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  />
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="bg-background border border-border rounded-md px-3 py-2"
                  >
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Tools">Tools</option>
                  </select>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Level (0-100)"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="hero" onClick={handleAddSkill}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingSkill(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="glass-card p-4 flex items-center justify-between">
                  {editingSkill?.id === skill.id ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 mr-4">
                      <Input
                        value={editingSkill.name}
                        onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                      />
                      <select
                        value={editingSkill.category}
                        onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                        className="bg-background border border-border rounded-md px-3 py-2"
                      >
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Tools">Tools</option>
                      </select>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editingSkill.level}
                        onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  ) : (
                    <div className="flex-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground ml-4 text-sm">
                        {skill.category} • {skill.level}%
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {editingSkill?.id === skill.id ? (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => handleUpdateSkill(editingSkill)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingSkill(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => setEditingSkill(skill)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteSkill(skill.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold">Manage Projects</h2>
              <Button variant="hero" onClick={() => setIsAddingProject(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>

            {isAddingProject && (
              <div className="glass-card p-4 space-y-4">
                <Input
                  placeholder="Project title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
                <Input
                  placeholder="Tech stack (comma separated)"
                  value={newProject.tech_stack}
                  onChange={(e) => setNewProject({ ...newProject, tech_stack: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="GitHub URL (optional)"
                    value={newProject.github_url}
                    onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                  />
                  <Input
                    placeholder="Live URL (optional)"
                    value={newProject.live_url}
                    onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="hero" onClick={handleAddProject}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="glass-card p-4">
                  {editingProject?.id === project.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      />
                      <Textarea
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="hero" onClick={() => handleUpdateProject(editingProject)}>
                          <Check className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingProject(null)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tech_stack.map((tech) => (
                            <span key={tech} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditingProject(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-display font-bold mb-4">Contact Messages</h2>
            
            {messages.length === 0 ? (
              <div className="glass-card p-8 text-center text-muted-foreground">
                No messages yet
              </div>
            ) : (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`glass-card p-4 ${!msg.read ? 'border-l-4 border-l-primary' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{msg.name}</span>
                          <span className="text-muted-foreground text-sm">({msg.email})</span>
                          {!msg.read && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">New</span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(msg.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleMessageRead(msg.id, msg.read)}
                        >
                          {msg.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteMessage(msg.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-display font-bold mb-4">Settings</h2>
            <div className="glass-card p-6">
              <p className="text-muted-foreground">
                Logged in as: <span className="text-foreground font-medium">{user?.email}</span>
              </p>
              <p className="text-muted-foreground mt-2">
                Role: <span className="text-primary font-medium">Admin</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
