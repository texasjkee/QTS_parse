const db = require('../config/db');

class Post {
  constructor(name, desc) {
    this.name = name;
    this.desc = desc;
  }
  
  async save() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    
    const createdAtDate = `${yyyy}.${mm}.${dd}`;
    
    const sql = `
      INSERT INTO \`films\` (\`id\`, \`name\`, \`desc\`, \`created_ad\`) 
      VALUES (NULL, '${this.name}', '${this.desc}', '${createdAtDate}');
    `

    const [newPost, _] = await db.execute(sql);
    
    return newPost;
  }

  static findAll() {
    const sql = 'SELECT * from `films`';

    return db.execute(sql);
  };
  
  static findById(id) {
    const sql = `SELECT * from \`films\` WHERE id =${id}`;

    return db.execute(sql);
  }
};

module.exports = Post;