type GetFieldsPath = (context: string) => string;
export const getFieldsPath: GetFieldsPath = (context) => `/${context}/field`;
type GetFieldPath = (id: string, context: string) => string;
export const getFieldPath: GetFieldPath = (id, context) =>
  `/${context}/field/${id}`;
type UpdateFieldPath = (context: string) => string;
export const updateFieldPath: UpdateFieldPath = (context) =>
  `/${context}/field`;
type CreateFieldPath = (context: string) => string;
export const createFieldPath: CreateFieldPath = (context) =>
  `/${context}/field`;
