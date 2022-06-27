const express = require('express');

//Importando as validações que irão funcionar como middleware
const validate = require('./validators/userCredentials');
// const donor = require('./validators/donorCredentials');
// const dependent = require('./validators/dependentCredentials');
// const hospital = require('./validators/hospitalCredentials');
// const collaborator = require('./validators/collaboratorCredentials');

//Importando nossos arquivos contendo os métodos de controle
const UserController = require('./controllers/UserController.js');
const DonorController = require('./controllers/DonorController.js');
const SessionController = require('./controllers/SessionController.js');
const DependentController = require('./controllers/DependentController.js');
const HospitalController = require('./controllers/HospitalController.js');
const CollaboratorController = require('./controllers/CollaboratorController.js');
const ScheduleController = require('./controllers/ScheduleController.js');

//Importando método de rotas do express
const routes = express.Router();

//Rotas da aplicação, cada uma apontando para um método de nossas controllers

//USER
routes.post('/user/register', validate.type, UserController.register);
routes.post('/user/email', validate.email, UserController.validateEmail);
routes.post('/user/password', validate.password, UserController.validatePassword);
routes.get('/user/list/all', UserController.indexAll);
routes.get('/user/list/:id', UserController.indexById);

//DONOR
routes.post('/donor/register', DonorController.register);
routes.post('/donor/validate', DonorController.validate);
routes.put('/donor/update/:id', DonorController.updateDonor)
routes.get('/donor/list/all', DonorController.indexAll);
routes.get('/donor/list/:id', DonorController.indexById);

//SESSION
routes.post('/session', SessionController.login);

//DEPENDENT
routes.post('/dependent/register', DependentController.register);
routes.post('/dependent/validate', DependentController.validate);
routes.put('/dependent/update/:id', DependentController.updateDependent);
routes.get('/dependent/list/all', DependentController.indexAll);
routes.get('/dependent/list/:id', DependentController.indexById);

//HOSPITAL
routes.post('/hospital/register', HospitalController.register);
routes.post('/hospital/validate', HospitalController.validate);
routes.get('/hospital/list/all', HospitalController.indexAll);
routes.get('/hospital/list', HospitalController.indexByCoords);
routes.get('/hospital/list/:id', HospitalController.indexById);
routes.get('/hospital/availability/:id', HospitalController.verifyAvailability);

//COLLABORATOR
routes.post('/collaborator/register', CollaboratorController.register);
routes.post('/collaborator/validate', CollaboratorController.validate);
routes.put('/collaborator/update/:id', CollaboratorController.updateCollaborator);
routes.get('/collaborator/list/all', CollaboratorController.indexAll);
routes.get('/collaborator/list/hospital/:id_hospital', CollaboratorController.indexByHospitalId);
routes.get('/collaborator/list/:id', CollaboratorController.indexById);

//SCHEDULE
routes.post('/schedule/register', ScheduleController.register);
routes.get('/schedule/list/all', ScheduleController.indexAll);
routes.get('/schedule/list/:id', ScheduleController.indexById);
routes.get('/schedule/list/hospital/:user', ScheduleController.indexWithHospital);
routes.delete('/schedule/delete/:id', ScheduleController.delete);


module.exports = routes;