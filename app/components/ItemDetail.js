import React from 'react';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      parent: {}
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
  }

  getData() {

    $.ajax({
      type: 'GET',
      url: '/api/mission',
      data: {'id': this.props.id}
    }).done((data) => {
      this.setState({item: data[0]});
      $.ajax({
        type: 'GET',
        url: '/api/mission',
        data: {id: data[0].parentId}
      }).done((data) => {
        this.setState({parent: data[0]});
      }).fail((jqxhr) => {
      });
    }).fail((jqxhr) => {
      alert('f');
    });
  }


  render() {

    return (
      <div>
        <a href={"../detail/" + this.state.parent._id}>{this.state.parent.name ? this.state.parent.name + '>' : '>'}</a>
        <div className="pull-right">
          <button type="button" className="btn-link">Edit</button>
          <button type="button" className="btn-link">Delete
          </button>
        </div>
        <div className="nav nav-list nav-divider">
          <li className="nav-divider"></li>
        </div>
        <div className="headbox">
          <checkbox >
            {this.state.item.name}
          </checkbox>
        </div>
      </div>
    );
  }
}

export default ItemDetail;


