import type { NavigatorScreenParams, } from '@react-navigation/native';

export type StackParamList = {
    Home: NavigatorScreenParams<TabParamList>;
    Index: undefined;
    Login: undefined;
    Email: undefined;
    Password: { user: string }
    Collaborator: { id: string, id_hospital: string }
    Maternity: { id: string }
    EditHospital: { id: string }
    EditCollaborator: { id: string, id_collaborator: string, collaborator: object }
    HospitalDetails: { hospital: object, id_user: string }
    ScheduleDetails: { schedule: object }
};

export type TabParamList = {
    Perfil: { id: string };
    Pendente: { id: string };
    Agenda: { id: string };
};