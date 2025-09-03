
// VIDEO REGISTRY v2.0 - Updated with TikTok video
// Add all your video projects here - they'll automatically appear in video player and related videos!

const VIDEO_PROJECTS = [
    {
        // Video 1: Brand Video Production
        id: 'brand-video',
        title: 'Brand Video Production',
        description: 'A promotional advertisement video edit for the opening of a new cinema',
        videoUrl: 'https://ik.imagekit.io/storm5615/video%20editing%201.mp4?updatedAt=1748376389164',
        thumbnailUrl: 'https://ik.imagekit.io/storm5615/brave_screenshot_imagekit.io.png?updatedAt=1756904043041',
        duration: '2:45',
        size: '45MB',
        category: 'Advertisement',
        tags: ['Video Editing', 'Motion Graphics', 'After Effects'],
        downloadUrl: 'https://ik.imagekit.io/storm5615/video%20editing%201.mp4?updatedAt=1748376389164'
    },
    {
        // Video 2: YouTube Shorts 1
        id: 'youtube-shorts-1',
        title: 'YouTube Shorts Video 1',
        description: 'Creative short-form video content optimized for YouTube Shorts format',
        videoUrl: 'https://ik.imagekit.io/storm5615/SnapTik-dot-Kim-39ff5f825fcf6fd85ba97bc02e93a881.mp4?updatedAt=1756914959376',
        thumbnailUrl: 'https://ik.imagekit.io/storm5615/brave_screenshot_imagekit.io%20(3).png?updatedAt=1756915390180',
        duration: '0:30',
        size: '15MB',
        category: 'YouTube Shorts',
        tags: ['YouTube Shorts', 'Short Form', 'Social Media'],
        downloadUrl: 'https://ik.imagekit.io/storm5615/SnapTik-dot-Kim-39ff5f825fcf6fd85ba97bc02e93a881.mp4?updatedAt=1756914959376'
    },
    {
        // Video 3: TikTok Content
        id: 'tiktok-video',
        title: 'TikTok Content',
        description: 'Creative short-form video content optimized for TikTok platform and viral engagement',
        videoUrl: 'https://ik.imagekit.io/storm5615/SnapTik-dot-Kim-fa61a25584d05ab13cb88c24fb47707e.mp4?updatedAt=1756914959149',
        thumbnailUrl: 'https://ik.imagekit.io/storm5615/brave_screenshot_imagekit.io%20(2).png?updatedAt=1756915390306',
        duration: '0:30',
        size: '15MB',
        category: 'TikTok',
        tags: ['TikTok', 'Short Form', 'Viral Content'],
        downloadUrl: 'https://ik.imagekit.io/storm5615/SnapTik-dot-Kim-fa61a25584d05ab13cb88c24fb47707e.mp4?updatedAt=1756914959149'
    }

    // ADD MORE VIDEOS HERE:
    // {
    //     id: 'corporate-video',
    //     title: 'Corporate Presentation',
    //     description: 'Professional corporate video showcasing company values',
    //     videoUrl: 'YOUR_VIDEO_URL_HERE',
    //     thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
    //     duration: '3:20',
    //     size: '62MB',
    //     category: 'Corporate',
    //     tags: ['Corporate', 'Professional', 'Branding'],
    //     downloadUrl: 'YOUR_VIDEO_URL_HERE'
    // },
    // {
    //     id: 'product-demo',
    //     title: 'Product Demonstration',
    //     description: 'Interactive product showcase highlighting key features',
    //     videoUrl: 'YOUR_VIDEO_URL_HERE',
    //     thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
    //     duration: '1:55',
    //     size: '38MB',
    //     category: 'Product Demo',
    //     tags: ['Product', 'Demo', 'Showcase'],
    //     downloadUrl: 'YOUR_VIDEO_URL_HERE'
    // },
    // {
    //     id: 'motion-graphics',
    //     title: 'Motion Graphics Showcase',
    //     description: 'Animated visual storytelling with dynamic motion graphics',
    //     videoUrl: 'YOUR_VIDEO_URL_HERE',
    //     thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
    //     duration: '2:15',
    //     size: '52MB',
    //     category: 'Motion Graphics',
    //     tags: ['Motion Graphics', 'Animation', 'Visual Effects'],
    //     downloadUrl: 'YOUR_VIDEO_URL_HERE'
    // }
];

// HELPER FUNCTIONS (Don't modify these)
function getAllVideoProjects() {
    return VIDEO_PROJECTS;
}

function getVideoProjectById(id) {
    return VIDEO_PROJECTS.find(video => video.id === id);
}

function getVideoProjectsByCategory(category) {
    return VIDEO_PROJECTS.filter(video => video.category === category);
}

function getRelatedVideos(currentVideoId, limit = 3) {
    return VIDEO_PROJECTS.filter(video => video.id !== currentVideoId).slice(0, limit);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VIDEO_PROJECTS,
        getAllVideoProjects,
        getVideoProjectById,
        getVideoProjectsByCategory,
        getRelatedVideos
    };
}

