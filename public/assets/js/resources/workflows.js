$('.navbar-header .nav a h4').html('Workflows');
$.ajax({
	url: '/api/workflows/developers',
	success: function(data) {
		Berry.collection.add('/api/workflows/developers',data)		
		$.ajax({

			url: '/api/'+route,
			success: function(data) {
				tableConfig.schema = [
					{label: 'Name', name:'name', required: true},
					{label: 'Description', name:'description', required: false, type:'textarea'},
					{label: 'Tags', name:'tags', required: false},
					{label: 'Lead Developer', name:'user_id', type:'select', choices: '/api/workflows/developers', template:'{{attributes.user.first_name}} {{attributes.user.last_name}} - {{attributes.user.email}}', required: false, value_key:'id',label_key:'email'},
					{name: 'id', type:'hidden'}
				];
				tableConfig.click = function(model){window.location.href = '/admin/'+route+'/'+model.attributes.id},
				tableConfig.events = [
					{'name': 'config', 'label': '<i class="fa fa-code"></i> Developers', callback: function(model){
						window.location.href = '/admin/workflows/'+model.attributes.id+'/developers'
					}}
				]
				tableConfig.name = "workflows";
				tableConfig.data = data;
				bt = new berryTable(tableConfig)
			}
		});
	}})