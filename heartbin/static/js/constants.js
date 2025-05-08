const SITE_ROOT = "http://127.0.0.1:8000"
const API_ROOT = `${SITE_ROOT}/api`;

const API_URLS = {
    inboxes: () => `${API_ROOT}/inboxes/`,
    inbox: (inbox_uuid) => `${API_ROOT}/inboxes/${inbox_uuid}/`,
    inboxReplies: (inbox_uuid) => `${API_ROOT}/inboxes/${inbox_uuid}/replies/`,
}
