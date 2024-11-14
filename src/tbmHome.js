import './tbmHome.css';

function Home() {
  return (
    <div className="TBM">
      <header className="TBM-header">
        <h1>The Bare Minimum II</h1>
      </header>
      <header className="CS162-header">
        <h2>CS162</h2>
      </header>
        <nav className="sub-nav">
          <ul>
            <li>
              <div className="list-item">
                <span>Methods:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                  <button className="list-button">1</button>
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Methods returning values:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Methods with strings and arrays:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Regular Expressions theory:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Recursion:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Finite Automata:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Bubble sort:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Binary search:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Classes and Objects:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Turing Machines:</span>
                <div className="button-group">
                  <button className="list-button">1</button>
                </div>
              </div>
            </li>
            <li>
              <div className="list-item">
                <span>Revision:</span>
                <div className="button-group">
                  <button className="list-button">2</button>
                </div>
              </div>
            </li>
          </ul>
        </nav>
    </div>
  );
}

export default Home;
