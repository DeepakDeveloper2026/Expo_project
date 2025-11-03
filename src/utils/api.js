// Fetch posts from jsonplaceholder and map them into event-like objects
export const fetchEventsFromMock = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    // Take first 12 posts and map to events
    const categories = ['Technology', 'Cultural', 'Career', 'Workshop', 'Sports'];
    const locations = ['Main Auditorium', 'Campus Grounds', 'Sports Complex', 'Seminar Hall', 'Computer Lab'];
    const organizers = ['Tech Club', 'Cultural Committee', 'Placement Cell', 'Coding Club', 'Communications Dept'];
    const now = new Date();
    return data.slice(0, 12).map((p, idx) => {
      const futureDate = new Date(now.getTime() + (idx + 3) * 24 * 60 * 60 * 1000);
      return {
        id: p.id,
        title: p.title.charAt(0).toUpperCase() + p.title.slice(1),
        description: p.body,
        category: categories[idx % categories.length],
        date: futureDate.toISOString().split('T')[0],
        location: locations[idx % locations.length],
        organizer: organizers[idx % organizers.length],
      };
    });
  } catch (e) {
    console.error('Fetch error', e);
    return [];
  }
};
