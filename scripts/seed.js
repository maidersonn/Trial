const db = require('../config/db');
const { sql } = require('slonik');

const seed = async () => {
    try {
        await db.query(sql`
            BEGIN;

            INSERT INTO members (email, id ) VALUES ('maidersonn@gmail.com', 'ef600d9a-e7d5-40e1-9d2b-3f3be78af4b5');

            INSERT INTO referral (referrer, email, description, involvement, talent, status)
            VALUES ('ef600d9a-e7d5-40e1-9d2b-3f3be78af4b5', 'email@gmail.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 8, 9, 'pending'),
            ('ef600d9a-e7d5-40e1-9d2b-3f3be78af4b5', 'email2@gmail.com', 'Mauris mollis ut arcu vel dignissim. ', 9, 10, 'pending'),
            ('ef600d9a-e7d5-40e1-9d2b-3f3be78af4b5', 'email3@gmail.com', 'Duis feugiat nisl ultrices magna sollicitudin dignissim. Maecenas vitae lacus quis diam tempus sollicitudin. ', 9, 8, 'pending');
            
            COMMIT;        
            `);

        console.info('> instertion done! 🚀');
    } catch (error) {
        console.info('> insertion error! ❌');
        console.info('>', error.message);
    }
};

seed();