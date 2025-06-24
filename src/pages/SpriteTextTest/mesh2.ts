/*
 * @Date: 2025-06-24 10:11:46
 * @Description: description
 */
import SpriteText from "three-spritetext";

const spriteText = new SpriteText('abc\n彩蛋', 300);
spriteText.strokeWidth = 2;
spriteText.padding = 80;
spriteText.strokeColor = 'green';

spriteText.borderColor = '#ffffff';
spriteText.borderWidth = 10;
spriteText.borderRadius = 100;
spriteText.backgroundColor = 'lightpink';

export default spriteText;