import type { NavigatorScreenParams, } from '@react-navigation/native';

export type StackParamList = {
    Home: NavigatorScreenParams<TabParamList>;
    Index: undefined;
    Login: undefined;
    Email: undefined;
    Password: { user: string }
    Register: { id: string }
    EditDonor: { id: string }
    Dependent: { id: string, id_donor: string }
    EditDependent: { id: string, id_donor: string, dependent: object }
    HospitalDetails: { hospital: object, id_user: string }
    ScheduleDetails: { schedule: object }
};

export type TabParamList = {
    Perfil: { id: string };
    Buscar: { id: string };
    Agenda: { id: string };
};