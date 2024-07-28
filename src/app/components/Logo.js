import css from './Logo.module.css';

function Logo() {
	return <p className={`font-thin ${css.text} ${css.customGradient}`}>Canvas</p>;
}

export default Logo;
