import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWraper";
import { blogPosts } from "../constants";

const Safari = () => {
    return (
        <>
        <div id="window-header">
            <WindowControls target="safari"/>
            <PanelLeft className="ml-10 icon"/>
            <div className="flex items-center gap-1 ml-5">
                <ChevronLeft className="icon" />
                <ChevronRight className="icon" />
            </div>
            <div className="flex-1 flex-center gap-3">
                <ShieldHalf className="icon" />
                <div className="search">
                    <Search className="icon"/>
                    <input type="text" placeholder="Search or enter website name" className="flex-1" />
                </div>
            </div>
            <div className="flex items-center gap-5">
                <Share className="icon"/>
                <Plus className="icon"/>
                <Copy className="icon"/>
            </div>

        </div>
        <div className="blog">
            <h2>My developer blog</h2>
            <div className="space-y-8">
                {blogPosts.map(({id,image,title,date,link})=>(
                    <div key={id} className="blog-posts flex gap-5">
                        <div className="col-span-2">
                            <img className="max-w-20" src={image} alt={title} />
                        </div>
                        <div className="content">
                            <p className="text-gray-400 text-sm">{date}</p>
                            <h3 className="text-md">{title}</h3>
                            <a href={link} target="_blank" className="flex items-center justify-start gap-2 text-xs text-blue-900" rel="noopener noreferrer">Checkout the full post <MoveRight className="icon-hover" size={10}/></a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
            
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;