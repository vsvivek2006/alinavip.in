const fs = require('fs');
const path = require('path');

const sisterRepos = [
  'd:/ALINA VIP/alinavip.com',
  'd:/ALINA VIP/escort.alinavip.com',
  'd:/ALINA VIP/aerocityescortservice.site',
  'd:/ALINA VIP/gurgaonescortservice.site',
];

sisterRepos.forEach(repo => {
  const f = path.join(repo, 'src/lib/supabaseBlog.ts');
  console.log(path.basename(repo), 'has supabaseBlog.ts:', fs.existsSync(f));
});
