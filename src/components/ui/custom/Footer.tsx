import React from 'react';
import { 
  Globe
} from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';


const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t py-4 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Globe className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm font-medium">NewsFlash © {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
          
          <div className="flex space-x-3">
            <a href="https://github.com/Swetarajpatel281" className="text-muted-foreground hover:text-foreground">
              <FaGithub size={24} />
            </a>
            <a href="https://x.com/Swetarajpatel28" className="text-muted-foreground hover:text-foreground">
             <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;