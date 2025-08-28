import React, { useState, useEffect } from 'react';
import type { ThemeColors, Service, PortfolioItem, ActionButton, ServiceSubsection, Page, User, SubscriptionPlan, Transaction } from '../types';
import { 
    DashboardIcon, SeoIcon, SocialIcon, PortfolioIcon, ServicesIcon, BlogIcon, PagesIcon, AppearanceIcon,
    UsersIcon, ShieldIcon, FormsIcon, PaymentsIcon, SettingsIcon, SystemIcon, ExitIcon, ContentIcon, MediaIcon,
    ApiIcon, AiIcon
} from './Icons';


// --- REUSABLE UI COMPONENTS ---
const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">{title}</h2>
        <div className="space-y-8">{children}</div>
    </div>
);
const Card: React.FC<{title?: string, children: React.ReactNode; className?: string}> = ({ title, children, className}) => (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        {title && <h3 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b">{title}</h3>}
        {children}
    </div>
);
const Button: React.FC<{children: React.ReactNode, onClick?: () => void, variant?: 'primary'|'secondary'|'danger', className?: string}> = ({children, onClick, variant='primary', className=''}) => {
    const styles = {
        primary: 'bg-red-600 text-white hover:bg-red-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-rose-500 text-white hover:bg-rose-600'
    };
    return <button onClick={onClick} className={`${styles[variant]} px-4 py-2 rounded-md font-semibold transition-colors ${className}`}>{children}</button>
}
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string}> = ({label, ...props}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input {...props} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
    </div>
);
const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {label: string}> = ({label, ...props}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea {...props} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"></textarea>
    </div>
);
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {label: string}> = ({label, children, ...props}) => (
     <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select {...props} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-white">
            {children}
        </select>
    </div>
);
const Toggle: React.FC<{label: string, description: string, enabled: boolean, onChange?: (enabled: boolean) => void}> = ({label, description, enabled, onChange}) => (
    <div className="flex items-center justify-between">
        <div>
            <h4 className="font-semibold text-gray-800">{label}</h4>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button onClick={() => onChange && onChange(!enabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-red-600' : 'bg-gray-200'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);


// --- SECTION COMPONENTS ---
const DashboardSection: React.FC<{ onQuickAction: (action: string) => void }> = ({ onQuickAction }) => (
    <Section title="Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <Card className="flex items-center"><div className="p-3 rounded-full bg-red-100 text-red-600 mr-4"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg></div><div><p className="text-sm font-medium text-gray-500">Website Traffic</p><p className="text-2xl font-bold text-gray-800">12,450</p></div></Card>
            <Card className="flex items-center"><div className="p-3 rounded-full bg-rose-100 text-rose-600 mr-4"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div><div><p className="text-sm font-medium text-gray-500">New Leads</p><p className="text-2xl font-bold text-gray-800">32</p></div></Card>
            <Card className="flex items-center"><div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4"><SocialIcon /></div><div><p className="text-sm font-medium text-gray-500">Social Followers</p><p className="text-2xl font-bold text-gray-800">2,890</p></div></Card>
            <Card className="flex items-center"><div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4"><PaymentsIcon /></div><div><p className="text-sm font-medium text-gray-500">Revenue</p><p className="text-2xl font-bold text-gray-800">$5,600</p></div></Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card title="Quick Actions" className="lg:col-span-1">
                <div className="flex flex-col space-y-3">
                    <Button onClick={() => onQuickAction('newPost')}>+ New Blog Post</Button>
                    <Button onClick={() => onQuickAction('newPage')}>+ New Page</Button>
                    <Button variant="secondary">Upload Media</Button>
                    <Button variant="secondary">View Site</Button>
                </div>
            </Card>
            <Card title="Activity Log" className="lg:col-span-2">
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span>John Doe published "New SEO Trends".</span><span className="text-gray-500">2 min ago</span></li>
                    <li className="flex justify-between"><span>Settings were updated.</span><span className="text-gray-500">1 hour ago</span></li>
                    <li className="flex justify-between"><span>New contact form submission from Jane.</span><span className="text-gray-500">3 hours ago</span></li>
                </ul>
            </Card>
        </div>
    </Section>
);

const SeoSection = () => (
    <Section title="SEO Management">
        <Card title="Global SEO Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Meta Title" type="text" placeholder="Your Site Title | Your Tagline" />
                <Input label="Meta Keywords" type="text" placeholder="marketing, seo, digital agency" />
                <Textarea label="Meta Description" rows={4} placeholder="Describe your website..." />
                <Textarea label="robots.txt" rows={4} defaultValue={"User-agent: *\nAllow: /"} />
            </div>
            <div className="mt-6 flex space-x-4">
                <Button>Save Changes</Button>
                <Button variant="secondary">Generate Sitemap</Button>
            </div>
        </Card>
        <Card title="Keyword Rank Tracking">
            <p className="text-gray-600">Track your performance on Google for target keywords.</p>
        </Card>
    </Section>
);

const BlogSection = () => {
    type Post = { id: number; title: string; category: string; date: string; };
    const initialPosts: Post[] = [
        { id: 1, title: 'Top 10 SEO Trends in 2024', category: 'SEO', date: 'July 15, 2024' },
        { id: 2, title: 'A Guide to Social Media Ads', category: 'Social Media', date: 'July 10, 2024' },
    ];
    const [posts, setPosts] = useState(initialPosts);
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const handleAddNew = () => {
        setEditingPost({ id: 0, title: '', category: '', date: new Date().toISOString().split('T')[0] });
        setView('editor');
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setView('editor');
    };
    
    const handleDelete = (id: number) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    const handleSave = (postToSave: Post) => {
        if (postToSave.id) {
            setPosts(posts.map(p => p.id === postToSave.id ? postToSave : p));
        } else {
            setPosts([...posts, { ...postToSave, id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'}) }]);
        }
        setView('list');
        setEditingPost(null);
    };

    const BlogEditor = ({ post, onSave, onCancel }: { post: Post, onSave: (post: Post) => void, onCancel: () => void}) => {
        const [currentPost, setCurrentPost] = useState(post);
        return (
            <Card>
                <h3 className="text-xl font-bold text-gray-700 mb-4">{post.id ? 'Edit Post' : 'Add New Post'}</h3>
                <div className="space-y-4">
                    <Input label="Post Title" value={currentPost.title} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} />
                    <Input label="Category" value={currentPost.category} onChange={e => setCurrentPost({...currentPost, category: e.target.value})} />
                    <Textarea label="Content" rows={10} placeholder="Write your blog post here..." />
                </div>
                 <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={onCancel} variant="secondary">Cancel</Button>
                    <Button onClick={() => onSave(currentPost)}>Save Post</Button>
                </div>
            </Card>
        );
    };

    if (view === 'editor' && editingPost) {
        return (
            <Section title="Blog Management">
                <BlogEditor post={editingPost} onSave={handleSave} onCancel={() => setView('list')} />
            </Section>
        )
    }

     return (
        <Section title="Blog Management">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">All Posts</h3>
                    <Button onClick={handleAddNew}>+ Add New Post</Button>
                </div>
                <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="p-2">Title</th><th className="p-2">Category</th><th className="p-2">Date</th><th className="p-2">Actions</th></tr></thead>
                    <tbody>
                        {posts.map(post => (
                            <tr className="border-b" key={post.id}>
                                <td className="p-2">{post.title}</td>
                                <td className="p-2">{post.category}</td>
                                <td className="p-2">{post.date}</td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() => handleEdit(post)} className="text-red-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(post.id)} className="text-rose-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </Section>
    );
};

const PagesSection: React.FC<{ 
    pages: Page[]; 
    onSave: (page: Page) => void;
    onDelete: (id: number) => void;
    trigger?: string | null; 
    onActionDone: () => void; 
}> = ({ pages, onSave, onDelete, trigger, onActionDone }) => {
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingPage, setEditingPage] = useState<Page | null>(null);

    const handleAddNew = () => {
        setEditingPage({
            id: 0,
            title: '',
            content: '',
            status: 'Draft',
            lastModified: new Date().toISOString().split('T')[0]
        });
        setView('editor');
    };

    useEffect(() => {
        if (trigger === 'newPage') {
            handleAddNew();
            onActionDone();
        }
    }, [trigger]);

    const handleEdit = (page: Page) => {
        setEditingPage(page);
        setView('editor');
    };

    const handleSave = (pageToSave: Page) => {
        onSave(pageToSave);
        setView('list');
        setEditingPage(null);
    };

    const PageEditor = ({ page, onSave, onCancel }: { page: Page, onSave: (page: Page) => void, onCancel: () => void }) => {
        const [currentPage, setCurrentPage] = useState(page);
        return (
            <Card>
                <h3 className="text-xl font-bold text-gray-700 mb-4">{page.id ? 'Edit Page' : 'Add New Page'}</h3>
                <div className="space-y-4">
                    <Input label="Page Title" value={currentPage.title} onChange={e => setCurrentPage({ ...currentPage, title: e.target.value })} />
                    <Textarea label="Content" rows={15} placeholder="Write your page content here..." value={currentPage.content} onChange={e => setCurrentPage({ ...currentPage, content: e.target.value })} />
                    <Select label="Status" value={currentPage.status} onChange={e => setCurrentPage({ ...currentPage, status: e.target.value as 'Published' | 'Draft' })}>
                        <option>Published</option>
                        <option>Draft</option>
                    </Select>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={onCancel} variant="secondary">Cancel</Button>
                    <Button onClick={() => onSave(currentPage)}>Save Page</Button>
                </div>
            </Card>
        );
    };

    if (view === 'editor' && editingPage) {
        return (
            <Section title="Page Management">
                <PageEditor page={editingPage} onSave={handleSave} onCancel={() => setView('list')} />
            </Section>
        )
    }

    return (
        <Section title="Page Management">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">All Pages</h3>
                    <Button onClick={handleAddNew}>+ Add New Page</Button>
                </div>
                <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="p-2">Title</th><th className="p-2">Status</th><th className="p-2">Last Modified</th><th className="p-2">Actions</th></tr></thead>
                    <tbody>
                        {pages.map(page => (
                            <tr className="border-b" key={page.id}>
                                <td className="p-2 font-semibold">{page.title}</td>
                                <td className="p-2">
                                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${page.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {page.status}
                                    </span>
                                </td>
                                <td className="p-2">{page.lastModified}</td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() => handleEdit(page)} className="text-red-600 hover:underline">Edit</button>
                                    <button onClick={() => onDelete(page.id)} className="text-rose-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </Section>
    );
};

const PortfolioEditor = ({ item, onSave, onCancel }: { item: PortfolioItem; onSave: (p: PortfolioItem) => void; onCancel: () => void; }) => {
    const [currentItem, setCurrentItem] = useState(item);

    const handleAddButton = () => {
        const newButton: ActionButton = { text: 'New Button', link: '#', type: 'primary' };
        setCurrentItem(prev => ({ ...prev, buttons: [...prev.buttons, newButton] }));
    };

    const handleRemoveButton = (index: number) => {
        setCurrentItem(prev => ({ ...prev, buttons: prev.buttons.filter((_, i) => i !== index) }));
    };

    const handleButtonChange = (index: number, field: keyof ActionButton, value: string) => {
        const updatedButtons = [...currentItem.buttons];
        updatedButtons[index] = { ...updatedButtons[index], [field]: value };
        setCurrentItem(prev => ({ ...prev, buttons: updatedButtons }));
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentItem.id ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h3>
            <div className="space-y-6">
                <Card title="Core Details">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Item Title" value={currentItem.title} onChange={e => setCurrentItem(s => ({...s, title: e.target.value}))} />
                        <Input label="Category" value={currentItem.category} onChange={e => setCurrentItem(s => ({...s, category: e.target.value}))} />
                         <div className="md:col-span-2">
                             <Textarea label="Description" value={currentItem.description || ''} onChange={e => setCurrentItem(s => ({...s, description: e.target.value}))} rows={4} />
                        </div>
                        <Select label="Status" value={currentItem.status} onChange={e => setCurrentItem(s => ({...s, status: e.target.value as 'Active'|'Inactive'}))}>
                            <option>Active</option>
                            <option>Inactive</option>
                        </Select>
                    </div>
                </Card>
                 <Card title="Media">
                     <Input label="Main Image URL" value={currentItem.image} onChange={e => setCurrentItem(s => ({...s, image: e.target.value}))} />
                     {/* A more advanced file uploader would go here */}
                </Card>
                 <Card title="Action Buttons">
                    <div className="space-y-4">
                        {currentItem.buttons.map((btn, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-8 gap-2 items-end p-2 border rounded-md">
                                <div className="md:col-span-3"><Input label="Button Text" value={btn.text} onChange={e => handleButtonChange(index, 'text', e.target.value)} /></div>
                                <div className="md:col-span-3"><Input label="Link" value={btn.link} onChange={e => handleButtonChange(index, 'link', e.target.value)} /></div>
                                <div className="md:col-span-1"><Select label="Type" value={btn.type} onChange={e => handleButtonChange(index, 'type', e.target.value)}>
                                    <option value="primary">Primary</option>
                                    <option value="secondary">Secondary</option>
                                </Select></div>
                                <Button variant="danger" onClick={() => handleRemoveButton(index)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleAddButton} variant="secondary" className="mt-4">+ Add Button</Button>
                </Card>
            </div>
             <div className="flex justify-end space-x-4 mt-8">
                <Button onClick={onCancel} variant="secondary">Cancel</Button>
                <Button onClick={() => onSave(currentItem)}>Save Item</Button>
            </div>
        </div>
    );
};
const PortfolioSection = () => {
    const initialItems: PortfolioItem[] = [
      { id: 1, title: 'E-commerce Site', description: '...', category: 'WordPress', status: 'Active', buttons: [], image: 'https://picsum.photos/500/400?random=1' },
      { id: 2, title: 'Real Estate Funnel', description: '...', category: 'Automation', status: 'Active', buttons: [], image: 'https://picsum.photos/500/400?random=2' },
    ];
    const [items, setItems] = useState<PortfolioItem[]>(initialItems);
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

    const handleAddNew = () => {
        setEditingItem({ id: 0, title: '', description: '', category: '', status: 'Active', buttons: [], image: '' });
        setView('editor');
    };
    const handleEdit = (item: PortfolioItem) => {
        setEditingItem(item);
        setView('editor');
    };
    const handleDelete = (id: number) => {
        setItems(items.filter(s => s.id !== id));
    };
    const handleSave = (itemToSave: PortfolioItem) => {
        if (itemToSave.id) {
            setItems(items.map(s => s.id === itemToSave.id ? itemToSave : s));
        } else {
            setItems([...items, { ...itemToSave, id: Date.now() }]);
        }
        setView('list');
        setEditingItem(null);
    };
    
    if (view === 'editor' && editingItem) {
        return (
            <Section title="Portfolio Management">
                <PortfolioEditor item={editingItem} onSave={handleSave} onCancel={() => setView('list')} />
            </Section>
        )
    }

    return (
        <Section title="Portfolio Management">
             <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">All Portfolio Items</h3>
                    <Button onClick={handleAddNew}>+ Add New Item</Button>
                </div>
                <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="p-2">Title</th><th className="p-2">Category</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="p-2 font-semibold">{item.title}</td>
                                <td className="p-2">{item.category}</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() => handleEdit(item)} className="text-red-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-rose-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </Section>
    );
};

const ServiceEditor = ({ service, onSave, onCancel }: { service: Service; onSave: (s: Service) => void; onCancel: () => void; }) => {
    const [currentService, setCurrentService] = useState(service);

    const handleAddButton = () => {
        const newButton: ActionButton = { text: 'New Button', link: '#', type: 'primary' };
        setCurrentService(prev => ({ ...prev, buttons: [...prev.buttons, newButton] }));
    };

    const handleRemoveButton = (index: number) => {
        setCurrentService(prev => ({ ...prev, buttons: prev.buttons.filter((_, i) => i !== index) }));
    };

    const handleButtonChange = (index: number, field: keyof ActionButton, value: string) => {
        const updatedButtons = [...currentService.buttons];
        updatedButtons[index] = { ...updatedButtons[index], [field]: value };
        setCurrentService(prev => ({ ...prev, buttons: updatedButtons }));
    };

    const handleAddSubsection = (type: ServiceSubsection['type']) => {
        let newSubsection: ServiceSubsection;
        const newId = Date.now();
        if (type === 'features') {
            newSubsection = { id: newId, type: 'features', title: 'Key Features', items: [{id: Date.now() + 1, text: 'New Feature'}] };
        } else if (type === 'faq') {
            newSubsection = { id: newId, type: 'faq', title: 'Frequently Asked Questions', items: [{id: Date.now() + 1, question: 'New Question?', answer: 'New Answer.'}] };
        } else { // pricing
            newSubsection = { id: newId, type: 'pricing', title: 'Our Packages', tiers: [{id: Date.now() + 1, name: 'Basic', price: '$0', features: ['Feature 1']}] };
        }
        setCurrentService(prev => ({ ...prev, subsections: [...prev.subsections, newSubsection]}));
    };
    
    const handleRemoveSubsection = (id: number) => {
        setCurrentService(prev => ({ ...prev, subsections: prev.subsections.filter(s => s.id !== id) }));
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentService.id ? 'Edit Service' : 'Add New Service'}</h3>
            <div className="space-y-6">
                <Card title="Core Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Service Title" value={currentService.title} onChange={e => setCurrentService(s => ({...s, title: e.target.value}))} />
                        <Input label="Category" value={currentService.category} onChange={e => setCurrentService(s => ({...s, category: e.target.value}))} />
                        <div className="md:col-span-2">
                             <Textarea label="Description" value={currentService.description} onChange={e => setCurrentService(s => ({...s, description: e.target.value}))} rows={4} />
                        </div>
                        <Input label="Sort Order" type="number" value={currentService.sortOrder} onChange={e => setCurrentService(s => ({...s, sortOrder: parseInt(e.target.value)}))} />
                        <Select label="Status" value={currentService.status} onChange={e => setCurrentService(s => ({...s, status: e.target.value as 'Active'|'Inactive'}))}>
                            <option>Active</option>
                            <option>Inactive</option>
                        </Select>
                    </div>
                </Card>

                <Card title="Action Buttons">
                    <div className="space-y-4">
                        {currentService.buttons.map((btn, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-8 gap-2 items-end p-2 border rounded-md">
                                <div className="md:col-span-3"><Input label="Button Text" value={btn.text} onChange={e => handleButtonChange(index, 'text', e.target.value)} /></div>
                                <div className="md:col-span-3"><Input label="Link" value={btn.link} onChange={e => handleButtonChange(index, 'link', e.target.value)} /></div>
                                <div className="md:col-span-1"><Select label="Type" value={btn.type} onChange={e => handleButtonChange(index, 'type', e.target.value)}>
                                    <option value="primary">Primary</option>
                                    <option value="secondary">Secondary</option>
                                </Select></div>
                                <Button variant="danger" onClick={() => handleRemoveButton(index)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleAddButton} variant="secondary" className="mt-4">+ Add Button</Button>
                </Card>

                <Card title="Subsections Manager">
                    <div className="space-y-4">
                        {currentService.subsections.map((sub) => (
                            <div key={sub.id} className="border p-4 rounded-lg bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-lg capitalize">{sub.type} Section</h4>
                                    <Button variant="danger" onClick={() => handleRemoveSubsection(sub.id)}>Remove Section</Button>
                                </div>
                                {sub.type === 'features' && <p>Feature list editor goes here.</p>}
                                {sub.type === 'faq' && <p>FAQ editor goes here.</p>}
                                {sub.type === 'pricing' && <p>Pricing tiers editor goes here.</p>}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t flex items-center space-x-2">
                        <span className="font-semibold">Add New Subsection:</span>
                        <Button onClick={() => handleAddSubsection('features')} variant="secondary">Features</Button>
                        <Button onClick={() => handleAddSubsection('faq')} variant="secondary">FAQ</Button>
                        <Button onClick={() => handleAddSubsection('pricing')} variant="secondary">Pricing</Button>
                    </div>
                </Card>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
                <Button onClick={onCancel} variant="secondary">Cancel</Button>
                <Button onClick={() => onSave(currentService)}>Save Service</Button>
            </div>
        </div>
    );
};
const ServicesSection = () => {
    const initialServices: Service[] = [
      { id: 1, title: 'SEO Optimization', description: '...', category: 'Marketing', status: 'Active', sortOrder: 1, buttons: [], subsections: [] },
      { id: 2, title: 'Web Development', description: '...', category: 'Development', status: 'Active', sortOrder: 2, buttons: [], subsections: [] },
    ];
    const [services, setServices] = useState<Service[]>(initialServices);
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingService, setEditingService] = useState<Service | null>(null);

    const handleAddNew = () => {
        setEditingService({ id: 0, title: '', description: '', category: '', status: 'Active', sortOrder: services.length + 1, buttons: [], subsections: [] });
        setView('editor');
    };
    const handleEdit = (service: Service) => {
        setEditingService(service);
        setView('editor');
    };
    const handleDelete = (id: number) => {
        setServices(services.filter(s => s.id !== id));
    };
    const handleSave = (serviceToSave: Service) => {
        if (serviceToSave.id) {
            setServices(services.map(s => s.id === serviceToSave.id ? serviceToSave : s));
        } else {
            setServices([...services, { ...serviceToSave, id: Date.now() }]);
        }
        setView('list');
        setEditingService(null);
    };

    if (view === 'editor' && editingService) {
        return (
            <Section title="Services Management">
                <ServiceEditor service={editingService} onSave={handleSave} onCancel={() => setView('list')} />
            </Section>
        )
    }

    return (
        <Section title="Services Management">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">All Services</h3>
                    <Button onClick={handleAddNew}>+ Add New Service</Button>
                </div>
                <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="p-2">Title</th><th className="p-2">Category</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id} className="border-b">
                                <td className="p-2 font-semibold">{service.title}</td>
                                <td className="p-2">{service.category}</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {service.status}
                                    </span>
                                </td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() => handleEdit(service)} className="text-red-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(service.id)} className="text-rose-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </Section>
    );
};
const SettingsSection = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = {
        general: 'General',
        reading: 'Reading & Writing',
        discussion: 'Discussion',
        permalinks: 'Permalinks',
        integrations: 'Integrations',
        maintenance: 'Maintenance'
    };
    
    const renderTabContent = () => {
        switch(activeTab) {
            case 'general':
                return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Site Title" defaultValue="Ready Multi Service" />
                    <Input label="Tagline" defaultValue="Web Development & Digital Marketing" />
                    <Input label="Administration Email Address" type="email" defaultValue="admin@readymultiservice.com" />
                    <Input label="Site URL" type="url" defaultValue="https://www.readymultiservice.com" />
                    <Select label="Site Language"><option>English (United States)</option><option>Hindi</option></Select>
                    <Select label="Timezone"><option>UTC+5:30</option><option>UTC+0</option></Select>
                </div>;
            case 'reading':
                return <div className="space-y-4">
                    <Select label="Your homepage displays"><option>Your latest posts</option><option>A static page</option></Select>
                    <Input label="Blog pages show at most" type="number" defaultValue="10" />
                    <Toggle label="Search Engine Visibility" description="Discourage search engines from indexing this site" enabled={false} />
                </div>;
             case 'discussion':
                return <div className="space-y-4">
                    <Toggle label="Allow comments on new posts" description="Users can post comments on new articles" enabled={true} />
                    <Toggle label="Comment author must fill out name and email" description="Force commenters to leave their details" enabled={true} />
                    <Toggle label="Comments must be manually approved" description="Hold all comments in a moderation queue" enabled={true} />
                </div>;
            case 'permalinks':
                return <div className="space-y-4">
                     <h4 className="font-bold">Common Settings</h4>
                     <label className="flex items-center"><input type="radio" name="permalink" className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500" defaultChecked /> Post name (e.g., /sample-post/)</label>
                     <label className="flex items-center"><input type="radio" name="permalink" className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500" /> Day and name (e.g., /2024/07/28/sample-post/)</label>
                </div>;
            case 'integrations':
                 return <div className="grid grid-cols-1 gap-6">
                    <Input label="Google Analytics Tracking ID" placeholder="UA-XXXXXXXXX-X" />
                    <Input label="Facebook Pixel ID" placeholder="Your Pixel ID" />
                    <Input label="Google Maps API Key" placeholder="Your Maps API Key" />
                </div>;
            case 'maintenance':
                 return <div className="space-y-4">
                    <Toggle label="Enable Maintenance Mode" description="Put the site in maintenance mode for visitors." enabled={false} />
                    <Textarea label="Maintenance Mode Message" rows={3} placeholder="We are currently performing scheduled maintenance. We should be back online shortly."/>
                 </div>;
            default: return null;
        }
    }

    return (
        <Section title="Site Settings">
            <Card>
                 <div className="flex border-b mb-6">
                    {Object.entries(tabs).map(([key, value]) => (
                        <button key={key} onClick={() => setActiveTab(key)} className={`px-4 py-2 font-semibold text-sm ${activeTab === key ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}>
                            {value}
                        </button>
                    ))}
                </div>
                {renderTabContent()}
                 <div className="mt-6 border-t pt-4">
                    <Button>Save Changes</Button>
                </div>
            </Card>
        </Section>
    );
};
const AIHubSection = () => {
    const [activeTab, setActiveTab] = useState('chat');
    return (
        <Section title="AI Hub">
            <Card>
                <div className="flex border-b mb-6">
                    {['Chat Assistant', 'Knowledge Base', 'Content Generation', 'Search & Personalization', 'Media AI', 'Settings & API'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])} className={`px-4 py-2 font-semibold text-sm ${activeTab === tab.toLowerCase().split(' ')[0] ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
                 {/* Content based on active tab would go here */}
                 <div>
                    <h3 className="text-xl font-bold mb-4 capitalize">{activeTab.replace('&', ' & ')}</h3>
                    <p>Advanced AI management interface for "{activeTab.replace('&', ' & ')}" goes here.</p>
                 </div>
            </Card>
        </Section>
    );
}

const UserEditor = ({ user, onSave, onCancel }: { user: User; onSave: (u: User) => void; onCancel: () => void; }) => {
    const [currentUser, setCurrentUser] = useState(user);

    return (
        <Card>
            <h3 className="text-xl font-bold text-gray-700 mb-4">{user.id ? 'Edit User' : 'Add New User'}</h3>
            <div className="space-y-4">
                <Input label="Full Name" value={currentUser.name} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} />
                <Input label="Email Address" type="email" value={currentUser.email} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} />
                <Select label="Role" value={currentUser.role} onChange={e => setCurrentUser({ ...currentUser, role: e.target.value as User['role'] })}>
                    <option>Administrator</option>
                    <option>Editor</option>
                    <option>User</option>
                </Select>
                <Select label="Status" value={currentUser.status} onChange={e => setCurrentUser({ ...currentUser, status: e.target.value as User['status'] })}>
                    <option>Active</option>
                    <option>Blocked</option>
                </Select>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <Button onClick={onCancel} variant="secondary">Cancel</Button>
                <Button onClick={() => onSave(currentUser)}>Save User</Button>
            </div>
        </Card>
    );
};

const UsersSection = ({ 
    users, 
    onSave, 
    onDelete,
    onToggleStatus,
} : {
    users: User[];
    onSave: (user: User) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
}) => {
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleAddNew = () => {
        setEditingUser({ id: 0, name: '', email: '', role: 'User', status: 'Active', lastLogin: 'Never' });
        setView('editor');
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setView('editor');
    };
    
    const handleSave = (userToSave: User) => {
        onSave(userToSave);
        setView('list');
        setEditingUser(null);
    };

    if (view === 'editor' && editingUser) {
        return (
            <Section title="User Management">
                <UserEditor user={editingUser} onSave={handleSave} onCancel={() => setView('list')} />
            </Section>
        )
    }

    return (
        <Section title="User Management">
             <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">All Users</h3>
                    <Button onClick={handleAddNew}>+ Add New User</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b"><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Role</th><th className="p-2">Status</th><th className="p-2">Last Login</th><th className="p-2">Actions</th></tr></thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b">
                                    <td className="p-2 font-semibold">{user.name}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.role}</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-2 text-sm text-gray-500">{user.lastLogin}</td>
                                    <td className="p-2 space-x-2 whitespace-nowrap">
                                        <button onClick={() => onToggleStatus(user.id)} className="text-blue-600 hover:underline">{user.status === 'Active' ? 'Block' : 'Unblock'}</button>
                                        <button onClick={() => handleEdit(user)} className="text-red-600 hover:underline">Edit</button>
                                        <button onClick={() => onDelete(user.id)} className="text-rose-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Section>
    );
};

const PlanEditor = ({ plan, onSave, onCancel }: { plan: SubscriptionPlan; onSave: (p: SubscriptionPlan) => void; onCancel: () => void; }) => {
    const [currentPlan, setCurrentPlan] = useState(plan);

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...currentPlan.features];
        newFeatures[index] = value;
        setCurrentPlan(p => ({ ...p, features: newFeatures }));
    };
    
    const handleRemoveFeature = (index: number) => {
        setCurrentPlan(p => ({ ...p, features: p.features.filter((_, i) => i !== index) }));
    };

    const handleAddFeature = () => {
        setCurrentPlan(p => ({...p, features: [...p.features, '']}));
    };

    return (
        <Card>
            <h3 className="text-xl font-bold text-gray-700 mb-4">{plan.id ? 'Edit Plan' : 'Add New Plan'}</h3>
            <div className="space-y-4">
                <Input label="Plan Name" value={currentPlan.name} onChange={e => setCurrentPlan({ ...currentPlan, name: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Monthly Price ($)" type="number" value={currentPlan.priceMonthly} onChange={e => setCurrentPlan({ ...currentPlan, priceMonthly: parseFloat(e.target.value) || 0 })} />
                    <Input label="Yearly Price ($)" type="number" value={currentPlan.priceYearly} onChange={e => setCurrentPlan({ ...currentPlan, priceYearly: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="space-y-2">
                        {currentPlan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
                                <Button variant="danger" onClick={() => handleRemoveFeature(index)}>X</Button>
                            </div>
                        ))}
                    </div>
                    <Button variant="secondary" onClick={handleAddFeature} className="mt-2 text-sm">+ Add Feature</Button>
                </div>
                <Select label="Status" value={currentPlan.status} onChange={e => setCurrentPlan({ ...currentPlan, status: e.target.value as 'Active'|'Inactive' })}>
                    <option>Active</option>
                    <option>Inactive</option>
                </Select>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <Button onClick={onCancel} variant="secondary">Cancel</Button>
                <Button onClick={() => onSave(currentPlan)}>Save Plan</Button>
            </div>
        </Card>
    );
};

const PaymentsSection = ({
    plans,
    transactions,
    onSavePlan,
    onDeletePlan
}: {
    plans: SubscriptionPlan[];
    transactions: Transaction[];
    onSavePlan: (plan: SubscriptionPlan) => void;
    onDeletePlan: (id: number) => void;
}) => {
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

    const handleAddNew = () => {
        setEditingPlan({ id: 0, name: '', priceMonthly: 0, priceYearly: 0, features: [], status: 'Active' });
        setView('editor');
    };
    
    const handleEdit = (plan: SubscriptionPlan) => {
        setEditingPlan(plan);
        setView('editor');
    };
    
    const handleSave = (planToSave: SubscriptionPlan) => {
        onSavePlan(planToSave);
        setView('list');
        setEditingPlan(null);
    };

    if (view === 'editor' && editingPlan) {
        return (
            <Section title="Payments & Plans">
                <PlanEditor plan={editingPlan} onSave={handleSave} onCancel={() => setView('list')} />
            </Section>
        )
    }

    return (
        <Section title="Payments & Plans">
            <Card title="Payment Gateway Settings">
                <div className="space-y-4">
                    <Toggle label="Stripe" description="Accept credit/debit card payments" enabled={true} />
                    <Toggle label="PayPal" description="Accept payments via PayPal" enabled={true} />
                    <Toggle label="Razorpay" description="Accept payments for Indian customers" enabled={false} />
                </div>
            </Card>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">Subscription Plans</h3>
                    <Button onClick={handleAddNew}>+ Add New Plan</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b"><th className="p-2">Plan Name</th><th className="p-2">Monthly Price</th><th className="p-2">Yearly Price</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
                        <tbody>
                            {plans.map(plan => (
                                <tr key={plan.id} className="border-b">
                                    <td className="p-2 font-semibold">{plan.name}</td>
                                    <td className="p-2">${plan.priceMonthly.toFixed(2)}</td>
                                    <td className="p-2">${plan.priceYearly.toFixed(2)}</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {plan.status}
                                        </span>
                                    </td>
                                    <td className="p-2 space-x-2 whitespace-nowrap">
                                        <button onClick={() => handleEdit(plan)} className="text-red-600 hover:underline">Edit</button>
                                        <button onClick={() => onDeletePlan(plan.id)} className="text-rose-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Card title="Transaction History">
                <table className="w-full text-left">
                     <thead><tr className="border-b"><th className="p-2">Date</th><th className="p-2">Customer</th><th className="p-2">Plan</th><th className="p-2">Amount</th><th className="p-2">Status</th></tr></thead>
                     <tbody>
                        {transactions.map(t => (
                             <tr key={t.id} className="border-b">
                                <td className="p-2 text-sm">{t.date}</td>
                                <td className="p-2">{t.customerName}</td>
                                <td className="p-2">{t.planName}</td>
                                <td className="p-2">${t.amount.toFixed(2)}</td>
                                <td className="p-2">
                                    <span className={`font-semibold ${t.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{t.status}</span>
                                </td>
                            </tr>
                        ))}
                     </tbody>
                </table>
            </Card>
        </Section>
    );
};


// --- MAIN ADMIN PANEL COMPONENT ---
interface AdminPanelProps {
  onLogout: () => void;
  themeColors: ThemeColors;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, themeColors }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [triggerAction, setTriggerAction] = useState<string | null>(null);

  // --- Centralized State Management ---
  const [pages, setPages] = useState<Page[]>([
        { id: 1, title: 'Home', status: 'Published', lastModified: '2024-07-20', content: 'Welcome to the homepage!' },
        { id: 2, title: 'About Us', status: 'Published', lastModified: '2024-07-18', content: 'This is the about page.' },
        { id: 3, title: 'Contact', status: 'Draft', lastModified: '2024-07-21', content: 'Contact us here.' },
  ]);
  const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Shubham Bagde', email: 'shubhamgbagde@gmail.com', role: 'Administrator', status: 'Active', lastLogin: '2024-07-28 10:00 AM' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-07-27 03:15 PM' },
        { id: 3, name: 'John Smith', email: 'john@example.com', role: 'User', status: 'Blocked', lastLogin: '2024-07-25 09:00 AM' },
  ]);
   const [plans, setPlans] = useState<SubscriptionPlan[]>([
        { id: 1, name: 'Basic', priceMonthly: 29, priceYearly: 290, features: ['1 Website', '10GB Storage', 'Email Support'], status: 'Active' },
        { id: 2, name: 'Pro', priceMonthly: 79, priceYearly: 790, features: ['10 Websites', '100GB Storage', 'Priority Support', 'SEO Tools'], status: 'Active' },
        { id: 3, name: 'Premium', priceMonthly: 149, priceYearly: 1490, features: ['Unlimited Websites', 'Unlimited Storage', '24/7 Support', 'Advanced Analytics'], status: 'Inactive' },
    ]);
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 'txn_1', customerName: 'Jane Doe', planName: 'Pro', amount: 79, date: '2024-07-20', status: 'Completed' },
        { id: 'txn_2', customerName: 'John Smith', planName: 'Basic', amount: 29, date: '2024-07-18', status: 'Completed' },
    ]);

  // --- Handlers ---
  const handleSavePage = (pageToSave: Page) => {
    const now = new Date().toISOString().split('T')[0];
    if (pageToSave.id) {
        setPages(pages.map(p => p.id === pageToSave.id ? { ...pageToSave, lastModified: now } : p));
    } else {
        setPages([...pages, { ...pageToSave, id: Date.now(), lastModified: now }]);
    }
  };
  const handleDeletePage = (id: number) => {
      setPages(pages.filter(p => p.id !== id));
  };

  const handleSaveUser = (userToSave: User) => {
    if (userToSave.id) {
        setUsers(users.map(u => u.id === userToSave.id ? userToSave : u));
    } else {
        setUsers([...users, { ...userToSave, id: Date.now() }]);
    }
  };
  const handleDeleteUser = (id: number) => {
      setUsers(users.filter(u => u.id !== id));
  };
  const handleToggleUserStatus = (id: number) => {
      setUsers(users.map(u => u.id === id ? {...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
  };
  
  const handleSavePlan = (planToSave: SubscriptionPlan) => {
    if (planToSave.id) {
        setPlans(plans.map(p => p.id === planToSave.id ? planToSave : p));
    } else {
        setPlans([...plans, { ...planToSave, id: Date.now() }]);
    }
  };
  const handleDeletePlan = (id: number) => {
      setPlans(plans.filter(p => p.id !== id));
  };


  const handleQuickAction = (action: string) => {
    if (action === 'newPage') {
        setActiveSection('pages');
        setTriggerAction('newPage');
    }
    if (action === 'newPost') {
        setActiveSection('blog');
    }
  };

  const sections: { [key: string]: { label: string; icon: React.ReactElement; component: React.ReactElement } } = {
    dashboard: { label: 'Dashboard', icon: <DashboardIcon />, component: <DashboardSection onQuickAction={handleQuickAction} /> },
    content: { label: 'Content', icon: <ContentIcon />, component: <Section title="Content Management"><p>Text management UI here</p></Section> },
    media: { label: 'Media Library', icon: <MediaIcon />, component: <Section title="Media Library"><p>Image management UI here</p></Section> },
    ai: { label: 'AI Hub', icon: <AiIcon />, component: <AIHubSection /> },
    blog: { label: 'Blog', icon: <BlogIcon />, component: <BlogSection /> },
    portfolio: { label: 'Portfolio', icon: <PortfolioIcon />, component: <PortfolioSection /> },
    services: { label: 'Services', icon: <ServicesIcon />, component: <ServicesSection /> },
    pages: { label: 'Pages', icon: <PagesIcon />, component: <PagesSection pages={pages} onSave={handleSavePage} onDelete={handleDeletePage} trigger={triggerAction} onActionDone={() => setTriggerAction(null)} /> },
    appearance: { label: 'Appearance', icon: <AppearanceIcon />, component: <Section title="Appearance"><p>Theme settings UI here</p></Section> },
    users: { label: 'Users', icon: <UsersIcon />, component: <UsersSection users={users} onSave={handleSaveUser} onDelete={handleDeleteUser} onToggleStatus={handleToggleUserStatus} /> },
    forms: { label: 'Forms', icon: <FormsIcon />, component: <Section title="Forms"><p>Form management UI here</p></Section> },
    payments: { label: 'Payments & Plans', icon: <PaymentsIcon />, component: <PaymentsSection plans={plans} transactions={transactions} onSavePlan={handleSavePlan} onDeletePlan={handleDeletePlan} />},
    settings: { label: 'Settings', icon: <SettingsIcon />, component: <SettingsSection /> },
  };

  const NavLink: React.FC<{id: string, isHeading?: boolean}> = ({ id, isHeading=false }) => {
      if (isHeading) {
          return <span className="px-4 pt-4 pb-1 text-xs font-semibold uppercase text-gray-500">{id}</span>
      }
      return (
        <button
          onClick={() => setActiveSection(id)}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md transition-colors duration-200 text-sm font-medium ${
            activeSection === id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {sections[id].icon}
          <span>{sections[id].label}</span>
        </button>
      );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center justify-center border-b border-gray-700 px-4">
            <a href="#" className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span className="text-xl font-bold">ReadyMultiService</span>
            </a>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <NavLink id="dashboard" />
            <NavLink id="Main" isHeading/>
            <NavLink id="content" />
            <NavLink id="media" />
            <NavLink id="ai" />
            <NavLink id="blog" />
            <NavLink id="portfolio" />
            <NavLink id="services" />
            <NavLink id="pages" />
             <NavLink id="Site" isHeading/>
             <NavLink id="appearance" />
             <NavLink id="users" />
             <NavLink id="forms" />
             <NavLink id="payments" />
             <NavLink id="settings" />
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={onLogout} className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-md transition-colors duration-200 bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white">
            <ExitIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {sections[activeSection]?.component || <div>Section not found</div>}
      </main>
    </div>
  );
};

export default AdminPanel;