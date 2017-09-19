const Database = require('./Database');
class LayerRoleManager extends Database {
	constructor(params) {
		super(params);
	}
	
	getByRole(role) {
		return new Promise((resolve, reject) => {
			this.connect().then(() => {
				return this.sql.query`SELECT layer,role,isView,isDelete,isEdit,isCreate FROM LAYERROLE WHERE ROLE = ${role}`;
			}).then(result => {
					resolve(result.recordset)
				this.close();
			}).catch(err => {
				reject(err);
				this.close();
			})
		});
	}

}
module.exports = LayerRoleManager;