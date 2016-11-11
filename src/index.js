import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      subreddit: 'javascript'
    };
  }

  changeSubReddit(event) {
    this.setState(
      {
        subreddit: event.target.value
      }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
    .then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts });
    });
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
    .then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.subreddit} onChange={this.changeSubReddit.bind(this)}></input>
          <button>Submit</button>
        </form>
        <h1>{`/r/${this.state.subreddit}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="reactjs"/>,
  document.getElementById('root')
);
