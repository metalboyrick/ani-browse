/** @jsxImportSource @emotion/react */

import Theme from "../styles/theme";

export default function InfoCard(props){
    return (
        
        <div>
            {/* title */}
            <div css={{
                marginRight: "14px",
                marginLeft: "14px",
                textAlign: "center",
                backgroundColor: Theme.colors.background,
                position: "relative",
                fontSize: Theme.fontSize.sectionHeader,
                top: "20px"
            }}>
                {props.title}
            </div>

            <div css={{
                border: `1px solid ${Theme.colors.white}`,
                borderRadius: "10px",
                padding: "20px 10px 10px 10px"
            }}>
                {props.children}
            </div>
        </div>

        
    );
}