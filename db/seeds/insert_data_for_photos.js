
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {
          author: 'SpongeBob', 
          link: 'https://cdn.pixabay.com/photo/2016/11/18/13/03/beach-1834329_960_720.jpg',
          description: `Good night, Gary. [SpongeBob goes to sleep but then is awaken to Patrick's snoring] Oh...what the...? [Gary hides in his shell and SpongeBob puts a cork in the sides of his head, and goes back to sleep. The wind blows and Patrick shivers, he then pulls the rock closer to him, SpongeBob shivers in the cold and pulls it back over himself. Gary sits on top of the rock as they keep pulling it back and forth until Patrick keeps the rock closer to him. SpongeBob gets cold and he covers himself with sand on and goes to sleep.`,
          author_id: '3',
          title: 'Home Sweet Pineapple',
        },
        {
          author: 'PatrickStarr', 
          link: 'http://www.patrickzephyrphoto.com/images/large/timeless.jpg',
          description: ` It's not leaving. You're just taking a break. [SpongeBob goes outside behind unseen] We're going to the carnival. We're going to the carni... [trips and falls on face] We're going to the carnival. We're going to the carnival. There it is, SpongeBob. The carnival is back in town. [many hooks are dangling] I'm gonna be first in line for everything!`,
          author_id: '4',
          title: 'SpongeBob is Life, I Live Under a Rock',
        },
        {
          author: 'SquidWard', 
          link: 'https://cdn-images-1.medium.com/max/1600/1*iZPQzoxDmAPQj2O3_bFFWA.jpeg',
          description: ` [talking to a wax sculpture of himself] Have I told you how beautiful you are? Your tentacles, your nose, your eyes...a little lopsided. [takes out the right eye, fixes it then puts it back in place] There. And now that I've been immortalized in wax, I have conquered all artistic media. Come on, my precious reflection, smile! [Squidward makes wax sculpture smile. Then he hears a crash from outside and frowns; the sculpture does as well]`,
          author_id: '5',
          title: 'When Squidward Realized There Were Consequences to Eating Thousands of Carbs',
        },
        {
          author: 'MrKrabs', 
          link: 'https://images.reference.com/reference-production-images/question/aq/ocean-crabs-eat_3b15c735ddeacd41.jpg',
          description: `[turns off lights and turns on slideshow and turns it to a picture of a dollar] I'm sure you know this charming fellow! [changes slide to him catching money] Here's the one that almost got away! [changes slide to a pile of money] Look at these pile towers of golden green! [changes slide to the Krusty Krab] Here's how the whole thing started! [cuts to flashback]`,
          author_id: '6',
          title: `Mr Krabs Tells a Story About His and Plankton's Rivalry`,
        },
        {
          author: 'Plankton', 
          link: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/01/20/12/p1.jpg',
          description: `Oh, just a little something I thought I'd try out. [a spitball hits Plankton in the back of his head. Class bullies laugh] Idiots! I'll show you with science! This concoction is going to blow everyone away. [muffled explosion. Plankton's container blew up all over his table and covers him in ashes. Classmates laugh. Billy, the ringleader of the hooligans and the same who shot Plankton with a spitball, grabs him]`,
          author_id: '7',
          title: 'I Call This One Walk the Plank',
        },
        {
          author: 'SandyCheeks', 
          link: 'http://www.freakingnews.com/pictures/128000/Sphere-Over-the-Ocean--128090.jpg',
          description: `I'm just being my own au-naturally squirrelly self! [Licks her teeth with her tongue. SpongeBob laughs nervously] Well, come on in! Y'all must be tired from telling them funny jokes all the time. Why don't you take a load off! [Pushes him onto a log with glue on it]`,
          author_id: '8',
          title: 'Squirrel Jokes and the Likes',
        }
      ]);
    });
};
