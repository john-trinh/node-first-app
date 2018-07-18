let login = require('../data/lang/login');
let forgotPassword = require('../data/lang/forgotPassword');

module.exports = {
	lang: (req, res) => {

		//add screen hear
    let screens = [
			login,
			forgotPassword
    ]

    let dataStructure =  {
			meta:
			{
				error: 200,
				message: ''
			},
			data:
			{
				default: 'en-PH',
				lang:
				{
					'en-PH':
					{
					},
				}
			}
    }

    screens.forEach((item, index) =>{
      dataStructure.data.lang['en-PH'] = Object.assign(item, dataStructure.data.lang['en-PH']); 
		});
		
		res.json(dataStructure);
	}
}