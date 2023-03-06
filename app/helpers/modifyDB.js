import fs from 'fs';

const filePath = './app/db/data.json';

const saveInfo = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

const readInfo = () => {
  let result;
  if (!fs.existsSync(filePath)) result = null;
  const info = fs.readFileSync(filePath, { encoding: 'utf-8' });
  if (!info) result = null;
  result = JSON.parse(info);
  return result;
};

export { saveInfo, readInfo };
