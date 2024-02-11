declare global {
    interface UserPublicMetadata {
        roles: ['student', 'admin', 'superadmin'];
    }
}

export default global;
