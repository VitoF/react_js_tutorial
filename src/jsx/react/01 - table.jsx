var TableList = React.createClass({
    doWithMultiSelector: function(){
        var selectedCheckBoxes = 0;
        $('.panel-body table input[type="checkbox"]').each(function(i,c){
            if (c.checked == true){selectedCheckBoxes++}
        });
        if (selectedCheckBoxes == 0) {
            $('.panel-heading input[type="checkbox"]').prop("indeterminate", false);
            $('.panel-heading input[type="checkbox"]').prop('checked', false);
        }else if(selectedCheckBoxes == ($('.panel-body table input[type="checkbox"]').length)){
            $('.panel-heading input[type="checkbox"]').prop("indeterminate", false);
            $('.panel-heading input[type="checkbox"]').prop('checked', true);
        }else{
            $('.panel-heading input[type="checkbox"]').prop("indeterminate", true);
        }
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },
    render: function() {
        var that = this;
        var userNodes = this.state.data.map(function(user){
            return (
                <tr>
                    <th scope="row"><input type="checkbox" value={user.id} onChange={that.doWithMultiSelector} /></th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.userName}</td>
                </tr>
            );
        });
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {userNodes}
                </tbody>
            </table>
        );
    }
});