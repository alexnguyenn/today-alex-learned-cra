import "./Header.css";

const Header = () => {
    return (
        <header>
            <h1>Today I Learned</h1>
            <p>
                {"This is a simple app I used to keep track of all my personal notes. "} 
                <a href="https://github.com/alexnguyenn/today-i-learned">Github</a>
            </p>
        </header>
    );
};

export default Header;