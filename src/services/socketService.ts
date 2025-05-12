// import { Socket } from 'socket.io-client';
import { NewsArticle, NewsCategory } from '@/types';
import { store } from '@/store';
import { addArticle } from '@/store/slices/newsSlice';
import { incrementNotificationCount } from '@/store/slices/uiSlice';

class SocketService {
  // private socket: Socket | null = null;
  private isConnected = false;
  private subscribedCategories: NewsCategory[] = [];

  connect() {
    // In a real app, we'd connect to a real server
    // For this demo, we'll simulate WebSocket behavior
    console.log('Socket service connecting...');
    
    // Simulate connection after 1 second
    setTimeout(() => {
      this.isConnected = true;
      console.log('Socket connected');
      
      // Subscribe to previously saved categories
      this.subscribedCategories.forEach(category => {
        this.subscribeToCategory(category);
      });
      
      // Start simulation of real-time updates
      this.simulateRealTimeUpdates();
    }, 1000);
  }

  disconnect() {
    if (this.isConnected) {
      console.log('Socket disconnected');
      this.isConnected = false;
      // this.socket = null;
      // In a real app: this.socket.disconnect()
    }
  }

  subscribeToCategory(category: NewsCategory) {
    if (!this.subscribedCategories.includes(category)) {
      this.subscribedCategories.push(category);
      console.log(`Subscribed to ${category}`);
      
      // In a real app:
      // this.socket.emit('subscribe', { category });
    }
  }

  unsubscribeFromCategory(category: NewsCategory) {
    this.subscribedCategories = this.subscribedCategories.filter(
      (c) => c !== category
    );
    console.log(`Unsubscribed from ${category}`);
    
    // In a real app:
    // this.socket.emit('unsubscribe', { category });
  }

  // Simulate real-time news updates
  private simulateRealTimeUpdates() {
    // Import mock data dynamically to avoid circular dependencies
    import('@/data/mockNewsData').then(({ mockNewsData }) => {
      const getRandomNews = (): NewsArticle => {
        const randomIndex = Math.floor(Math.random() * mockNewsData.length);
        const article = { ...mockNewsData[randomIndex] };
        
        // Generate a new ID and adjust timestamps to simulate a new article
        article.id = `new-${Date.now()}`;
        article.publishedAt = new Date().toISOString();
        
        return article;
      };
      
      // Send a new article every 20-30 seconds
      const simulateNewArticle = () => {
        if (!this.isConnected) return;
        
        const newArticle = getRandomNews();
        
        // Only push updates for subscribed categories
        if (this.subscribedCategories.includes(newArticle.category)) {
          console.log(`New article received in category: ${newArticle.category}`);
          store.dispatch(addArticle(newArticle));
          store.dispatch(incrementNotificationCount());
        }
        
        // Schedule next update
        const nextUpdateTime = 20000 + Math.random() * 10000;
        setTimeout(simulateNewArticle, nextUpdateTime);
      };
      
      // Start the simulation
      setTimeout(simulateNewArticle, 8000);
    });
  }
}

export const socketService = new SocketService();

export default socketService;