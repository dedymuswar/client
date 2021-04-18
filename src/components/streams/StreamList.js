import React from 'react';
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'
import { Link } from 'react-router-dom'
class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.idUser === this.props.currentUserId)
        {
            return (
                <div className="right floated content">
                    <Link to={`streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <button className="ui button negative">Delete</button>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    renderCreate() {
        if (this.props.isSignedIn)
        {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary" >Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        console.log(this.props.streams);
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // mengubah state menjadi this.props.streams agar bisa di render di components
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.idUser,
        isSignedIn: state.auth.isSignedIn
    }
    // object.values adalah fungsi buildin di javascript
}

export default connect(mapStateToProps, { fetchStreams: fetchStreams })(StreamList)