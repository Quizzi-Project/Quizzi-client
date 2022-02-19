function getUrl(entityName = '') {
  return process.env.NODE_ENV !== 'development'
    ? `/${entityName}`
    : `http://localhost:3001/${entityName}`;
}

export default { getUrl };
