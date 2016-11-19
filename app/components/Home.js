import React from 'react';

class Home extends React.Component {
  render() {
    return (
	    <div className="container">
			<div className="row clearfix">
				<div className="col-md-12 column">
					<form role="form">
						<div className="form-group">
							 <label for="exampleInputPassword1">Mission</label><input type="text" className="form-control" id="exampleInputPassword1" />
						</div>

						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
			</div>
		</div>
    );
  }
}

export default Home;