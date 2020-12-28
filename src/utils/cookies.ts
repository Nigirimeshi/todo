// 认证 Token。
const TOKEN_KEY = 'token';
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

// 侧边栏展开、关闭的状态。
const SIDEBAR_STATUS_KEY = 'sidebar_status';
export const getSidebarStatus = (): string | null => localStorage.getItem(SIDEBAR_STATUS_KEY);
export const setSidebarStatus = (status: string): void => localStorage.setItem(SIDEBAR_STATUS_KEY, status);
