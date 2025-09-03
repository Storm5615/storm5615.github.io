// GRAPHICS DESIGN REGISTRY
// Add all your graphics design projects here - they'll automatically appear in portfolio and gallery!

const GRAPHICS_PROJECTS = [
    {
        // Project 1: Creative Graphics Design
        id: 'creative-graphics-1',
        title: 'Creative Graphics Design',
        description: 'Professional graphic design showcasing creative visual communication and brand identity.',
        image: 'https://ik.imagekit.io/storm5615/g2.png?updatedAt=1748375589683',
        category: 'Graphics Design',
        tags: ['Graphic Design', 'Visual Identity', 'Creative Design'],
        downloadUrl: 'https://ik.imagekit.io/storm5615/g2.png?updatedAt=1748375589683'
    },

    {
        // Project 2: Creative Graphics Design
        id: 'creative-graphics-2',  // ← Changed from 1 to 2
        title: 'Creative Graphics Design',
        description: 'Professional graphic design showcasing creative visual communication and brand identity.',
        image: 'https://ik.imagekit.io/storm5615/g7.png?updatedAt=1748375604606',
        category: 'Graphics Design',
        tags: ['Graphic Design', 'Visual Identity', 'Creative Design'],
        downloadUrl: 'https://ik.imagekit.io/storm5615/g7.png?updatedAt=1748375604606'
    }

    // ADD MORE GRAPHICS PROJECTS HERE:
    // {
    //     id: 'logo-design-1',
    //     title: 'Brand Logo Design',
    //     description: 'Modern logo design for tech startup',
    //     image: 'YOUR_IMAGE_URL_HERE',
    //     category: 'Logo Design',
    //     tags: ['Logo', 'Branding', 'Identity'],
    //     downloadUrl: 'YOUR_DOWNLOAD_URL_HERE'
    // },
    // {
    //     id: 'poster-design-1',
    //     title: 'Event Poster Design',
    //     description: 'Creative poster for music event',
    //     image: 'YOUR_IMAGE_URL_HERE',
    //     category: 'Poster Design',
    //     tags: ['Poster', 'Event', 'Creative'],
    //     downloadUrl: 'YOUR_DOWNLOAD_URL_HERE'
    // }
];

// HELPER FUNCTIONS (Don't modify these)
function getAllGraphicsProjects() {
    return GRAPHICS_PROJECTS;
}

function getGraphicsProjectById(id) {
    return GRAPHICS_PROJECTS.find(project => project.id === id);
}

function getGraphicsProjectsByCategory(category) {
    return GRAPHICS_PROJECTS.filter(project => project.category === category);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GRAPHICS_PROJECTS, getAllGraphicsProjects, getGraphicsProjectById, getGraphicsProjectsByCategory };
}



