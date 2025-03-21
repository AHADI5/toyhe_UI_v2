import { getAccessRights } from "../../actions/auth/auth_actions";


const SideBarMenu = () => {
    const modelNames = getModelNamesFromAccessRights();
    return (
        <>
            <p>SideBar Goes here</p>
            {modelNames.map(modelName => <p key={modelName}>{modelName.toLowerCase()}</p>)}
        </>
    )
}

export default SideBarMenu;

const getModelNamesFromAccessRights = () => {
    const accessRights = getAccessRights(); 
    return accessRights.map(accessRight => accessRight.model);
}