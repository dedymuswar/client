import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux'
import { fetchStream, editStream} from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        // passing ke action edit stream dengan parameter (id, dan formvalues)
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        // jika ketika props.stream undefined saat upload kedua kalinya maka tampilkan loading
        if (!this.props.stream) {
            return <div>Loading ...</div>
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                {/* this.props.stream adalah object dari stream(title dan deskripsi) */}
                <StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} 
                onSubmit={this.onSubmit}></StreamForm>
            </div>
        )
    }
}
// berikut parameer pertama (state) adalah state dari reducers redux dan parameter kedua dari props komponen
const mapStateToProps = (state, ownProps) => {
    // stream adalah hasil dari pencarian id dari state redux, lalu hasilnya di jadikan props dan diakses dengan this.props.stream
    return { stream: state.streams[ownProps.match.params.id] }
}

//Issue ketika page di refresh jika di console log pada render maka mengahsilkan nilai this.props stream undefined karena distate tidak ditemukan id stream pada state redux sesuai yang dicari. maka dibuat class cmponent dan di component did mount jawabannya untuk fetchstream ke api dan return kembali ke state redux, jadi dua kali render component.

export default connect(mapStateToProps, {fetchStream:fetchStream, editStream:editStream})(StreamEdit)