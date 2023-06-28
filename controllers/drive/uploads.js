const fs = require('fs').promises
const fss = require('fs');
const stream = require('stream')
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis')
// If modifying these scopes, delete token.json.
const SCOPES = [
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/drive.file',
	'https://www.googleapis.com/auth/drive.appdata'
]
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'src','drive','token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'src','drive','credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function listFiles(auth, where = {} ) {
	const drive = google.drive({version: 'v3', auth});
	const res = await drive.files.list(where);
	return res.data.files || []
}

async function listDeleteFiles(auth, where = {} ) {
	const drive = google.drive({version: 'v3', auth });
	const res = await drive.files.delete(where);
	return res
}

async function listDeleteFiles(auth, where = {} ) {
	const drive = google.drive({version: 'v3', auth });
	const res = await drive.files.delete(where);
	return res
}

async function uploadFile(auth, fileObject, id) {
	try {
		

		const bufferStream = new stream.PassThrough()
		bufferStream.end(fileObject.buffer)
		const { data } = await google.drive(
				{ 
					version: 'v3',
					auth
				}
			).files.create(
				{
					media: {
						mimeType: fileObject.mimeType,
						body: bufferStream
					},
					requestBody: {
						name: fileObject.originalname,
						parents: [id]
					},
					fields: '*',
				}
			)
		 			
	}catch(err) {
		throw err
	}
}

const uploadSaveFiles  = async (req, res) => {
    try {
		const  {dataValues}  =  await user.findOne({ where: { user_id: req.body.user_id } })
		if(!dataValues) {
			// throw new Error('not user ');
			throw new Error('Error User')
		}
		
		res.send({
			...dataValues
		})
    } catch (err) {
		res.status(403).send({
			mns: err.message
		})
    }
}

const generatePublicUrl =  async (auth, fileId) => {
	try {
		const drive = google.drive({ version: "v3", auth})
		await drive.permissions.create({
			fileId,
			requestBody: {
			role: 'reader',
			type: 'anyone',
			},
		})
	  /* 
	  webViewLink: View the file in browser
	  webContentLink: Direct download link 
	  */
	  const result = await drive.files.get({
		fileId,
		fields: 'webViewLink, webContentLink',
	  });
	  return result
	} catch (error) {
	  console.log(error.message);
	}
}


async function createFolder (auth, {name, parents}) {
	try {
		const drive = google.drive({ version: "v3", auth})
		const fileMetaData = {
			mimeType: "application/vnd.google-apps.folder",
			name,
			parents
		}
		
		const  { data } = await drive.files.create({
		  fields: "id",
		  resource: fileMetaData
		})
		return data
	}catch(err){
		throw err
	}
}

async  function setcreateFolder (req,res) {
	try {
		const auth = await authorize()
		const folder = await createFolder(auth, req.body)
		res.send(folder)
	} catch(err){
		res.status(400).send({
			mns: err.message
		})
	}
} 

async function searchFile() {
	try {
		const auth = await authorize()
		const service = google.drive({version: 'v3', auth});
		const files = [];
		const res = await service.files.list({
			q: 'mimeType=\'image/jpeg\'',
			fields: 'nextPageToken, files(id, name)',
			spaces: 'drive',
		});
		Array.prototype.push.apply(files, res.files);
		res.data.files.forEach(function(file) {
			console.log('Found file:', file.name, file.id);
		});
		return res.data.files;
	} catch (err) {
	  // TODO(developer) - Handle error
	  throw err;
	}
}




async function  getlistFiles (req,res) {
	try {
		const auth = await authorize()
		const list = await listFiles(auth,
			{
				q: `'${req.query.parents}' in parents and trashed = false`,
				fields: 'nextPageToken, files(id, name)',
				spaces: 'drive',
			}
		)
		res.send({
			'data': list
		})
	}catch(err) {
		throw err
	}    
}

async function deleteFile(req,res) {
	try {
		const auth = await authorize()
		const { fileId } = req.query
		const response = await listDeleteFiles(auth,
			{
				fileId
			}
		)
		
		res.send({
			'data': fileId
		})
	} catch (error) {
		res.send({
			'mns': error.message || error.stack || 'Erro no identificado'
		})
	}
}

async function managerFilesEvidencias (req, res, next) {
	try {
		const {  files } = req
		const auth = await authorize()
		// Buscar Folder Existente.
		if ( !req.body.suppliers  || !req.body.parents ){
			throw new Error('Error supplier / parents')
		}
		const foldersVendor = await listFiles(auth, {
			q: `mimeType='application/vnd.google-apps.folder' and '${req.body.parents}' in parents and name = '${req.body.suppliers}' and trashed = false`,
			fields: 'nextPageToken, files(id, name)',
			spaces: 'drive',
		}) || []
		let idFolderSupplier = !foldersVendor[0]?.id ?  false : foldersVendor[0]?.id
		if(!idFolderSupplier) {
			//Creamos Folder vendor -> type
			const {id } = await createFolder(
				auth,
				{
					"name" : req.body.suppliers,
					"parents": [req.body.parents]
				}
			)
			idFolderSupplier = id
		}

		// search folder for type

		const foldersType = await listFiles(auth, {
			q: `mimeType='application/vnd.google-apps.folder' and '${idFolderSupplier}' in parents and name = '${req.body.type}' and trashed = false`,
			fields: 'nextPageToken, files(id, name)',
			spaces: 'drive',
		}) || []
		
		let idFoldertType = !foldersType[0]?.id ?  false : foldersType[0]?.id
		if(!idFoldertType) {
			//Creamos Folder vendor -> type
			const {id } = await createFolder(
				auth,
				{
					"name" : req.body.type,
					"parents": [idFolderSupplier]
				}
			)
			idFoldertType = id
		}
		// Carga de Archivos.
		for (let f = 0; f < files.length; f += 1) {
            await uploadFile(auth, files[f], idFoldertType)
        }
		// get Url
		const  { data }  = await generatePublicUrl(auth, idFoldertType)
		const { webViewLink } = data
		res.send({
			data: {
				idFolderSupplier,
				idFoldertType,
				webViewLink
			}
		})
	}catch(err){
		res.status(404).send({
			mns: err.message
		})
	}
}

const uploadServer = async (req, res) => {
	try {
		
		const { files = [] } = req
		if (!files.length) {
			throw new Error('No se encontraron Archivos')
		}
		// authnticate Google
		const auth = await authorize()
		const servicesdrive = await google.drive(
			{ 
				version: 'v3',
				auth
			}
		)
		for (const key in files) {
			const { 
				originalname = '',
				mimetype = '',
				path = ''
			} = files[key]
			const fileMetadata = {
				name: originalname,
				parents: [req.body.parents], // Change it according to your desired parent folder id
			}
			
			const media = {
				mimeType: mimetype,
				body: fss.createReadStream(path),
			}	
			//creamos archivo
			const { data } = await servicesdrive.files.create(
				{
					requestBody: fileMetadata,
					media: media,
					fields: "webContentLink, webViewLink",
				}
			)
			// Eliminar Archivo
			await deleteFileSystem(path)
		}
		//get url del parent
		const {data} = await generatePublicUrl(auth, req.body.parents)
		
		res.status(200).send({
			data
		})
  } catch (error) {
    res.status(500).send({
			data: error.message
		})
  }
}

const deleteFileSystem = async (filePath) => {
	try {
		fs.unlink(filePath, () => {
			
		})
	} catch( error ) {
		throw new Error(error.message || error.stack)
	}
}

module.exports = {
  getlistFiles,
  uploadSaveFiles,
  generatePublicUrl,
  setcreateFolder,
  managerFilesEvidencias,
  uploadFile,
  deleteFile,
	uploadServer
}