import fs from 'fs';

const filePath = './db/data.json';

const saveInfo = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

const readInfo = () => {
  if (!fs.existsSync(filePath)) return null;
  const info = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(info);
//   console.log(data);
  return data;
};

export { saveInfo, readInfo };
