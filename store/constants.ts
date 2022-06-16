export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refresh_token';

export const CLEAR = 'CLEAR';

// upload constants
export const GET_UPLOADS_SUCCESS = 'GET_UPLOADS_SUCCESS';
export const GET_UPLOADS_FAILURE = 'GET_UPLOADS_FAILURE';

export const BRANDING_REQUEST = 'BRANDING_REQUEST';
export const GET_BRANDING_SUCCESS = 'GET_BRANDING_SUCCESS';
export const BRANDING_FAILURE = 'BRANDING_FAILURE';

export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const GET_STATE_MACHINE_REQUEST = 'GET_STATE_MACHINE_REQUEST';
export const GET_STATE_MACHINE_SUCCESS = 'GET_STATE_MACHINE_SUCCESS';
export const GET_STATE_MACHINE_FAILURE = 'GET_STATE_MACHINE_FAILURE';

export const APPLICATION_REQUEST = 'APPLICATION_REQUEST';
export const GET_APPLICATIONS_SUCCESS = 'GET_APPLICATIONS_SUCCESS';
export const START_APPLICATION_SUCCESS = 'START_APPLICATION_SUCCESS';
export const GET_APPLICATION_BY_ID_SUCCESS = 'GET_APPLICATION_BY_ID_SUCCESS';
export const UPDATE_APPLICATION_BY_ID_SUCCESS =
  'UPDATE_APPLICATION_BY_ID_SUCCESS';
export const APPLICATION_FAILURE = 'APPLICATION_FAILURE';
export const REMOVE_APPLICATION_SUCCESS = 'REMOVE_APPLICATION_SUCCESS';

// stage

export const REQUEST_SAVE_STAGE = 'REQUEST_SAVE_STAGE';
export const STAGE_SAVED = 'STAGE_SAVED';
export const FAILED_SAVE_STAGE = 'FAILED_SAVE_STAGE';
export const REQUEST_RESOLVE_STAGE_DATA = 'RESOLVE_STAGE_DATA';
export const STAGE_DATA_RESOLVED = 'STAGE_DATA_RESOLVED';
export const FAILED_RESOLVE_STAGE_DATA = 'FAILED_RESOLVE_STAGE_DATA';

// auth
export const AUTH_START_LOGIN = `AUTH_START_LOGIN`;
export const AUTH_SUCCESS_LOGIN = `AUTH_SUCCESS_LOGIN`;
export const AUTH_FAILED_LOGIN = `AUTH_FAILED_LOGIN`;
export const LOGOUT = `LOGOUT`;

// form
export const FORM_REQUEST_IN_PROGRESS = 'form/in-progress';
export const FORM_FETCHED = 'form/fetched';
export const FORM_REQUEST_FAILURE = 'form/failed';

// formData
export const FORM_DATA_REQUEST_IN_PROGRESS = 'form-data/in-progress';
export const FORM_DATA_FETCHED = 'form-data/fetched';
export const FORM_DATA_PHASE_CARD_FETCHED = 'form-data/phase/card/fetched';
export const FORM_DATA_REQUEST_FAILURE = 'form-data/failed';

// fieldTypes
export const GET_FIELD_TYPES_REQUEST = 'GET_FIELD_TYPES_REQUEST';
export const GET_FIELD_TYPES_SUCCESS = 'GET_FIELD_TYPES_SUCCESS';
export const GET_FIELD_TYPES_FAILURE = 'GET_FIELD_TYPES_FAILURE';

// modal
export const OPEN_MODAL = 'modals/open';
export const CLOSE_MODAL = 'modals/close';

export const MODAL_KEY_MAP = {
  CARD_DETAIL: 'CARD_DETAIL',
  CREATE_CARD: 'CREATE_CARD',
  CREATE_PHASE: 'CREATE_PHASE',
  PIPE_SETTING: 'PIPE_SETTING',
  CREATE_CONDITION: 'CREATE_CONDITION',
};

// cards
export const CARDS_REQUEST_IN_PROGRESS = 'cards/in-progress';
export const CARD_MOVED = 'cards/move';
export const CARD_CREATED = 'cards/created';
export const CARD_UPDATED = 'cards/updated';
export const CARDS_REQUEST_FAILURE = 'cards/failed';

// pipes
export const PIPES_REQUEST_IN_PROGRESS = 'pipes/in-progress';
export const PIPES_FETCHED = 'pipes/list/fetched';
export const PIPE_FETCHED = 'pipes/single/fetched';
export const PIPES_REQUEST_FAILURE = 'pipes/failed';

// phases
export const PHASES_REQUEST_IN_PROGRESS = 'pipes/phase/in-progress';
export const PHASES_FETCHED = 'pipes/phase/list/fetched';
export const PHASE_CREATED = 'pipes/phase/created';
export const PHASES_REQUEST_FAILURE = 'pipes/phase/failed';
