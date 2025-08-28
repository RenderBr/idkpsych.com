import fs from 'fs';
import { Colors } from '~~/shared/types/ColorSet';
import { TagColor } from '~~/shared/types/TagColor';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const tag = query.tag;

  if (!tag) {
    return { error: "Tag is required" };
  }

  const doesFileExist = fs.existsSync('tag-colors.json');

  if (!doesFileExist) {
    fs.writeFileSync('tag-colors.json', '[]');
  }

  const fileContents = fs.readFileSync('tag-colors.json', 'utf-8');
  const tagColors: TagColor[] = JSON.parse(fileContents);

  const tagColor = tagColors.find((tc) => tc.tag === tag.toString());

  if (tagColor) {
    return tagColor;
  }

  const randomIndex = Math.floor(Math.random() * Colors.length);
  const randomColor = Colors[randomIndex];

  const newTagColor: TagColor = {
    tag: tag.toString(),
    color: randomColor
  };

  tagColors.push(newTagColor);
  fs.writeFileSync('tag-colors.json', JSON.stringify(tagColors, null, 2));

  return newTagColor;
})
