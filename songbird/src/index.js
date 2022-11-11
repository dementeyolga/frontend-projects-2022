import img from './assets/images/lavanda_tsvety_razmytie_276320_1920x1080.jpg';
import './styles/main.css';

const heading = document.createElement('h1');
heading.textContent = 'Как интересно!';

// добавляем заголовок в DOM
const root = document.querySelector('#root');
root.append(heading);
