/** @jsxImportSource @emotion/react */

import Head from "next/head";
import Theme from "../styles/theme";
import { Button } from 'antd';

export default function Navbar() {
    return (
        <header css={{
            backgroundColor: Theme.colors.background
        }}>
            <div
                css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px 20% 15px 20%"
            }}>
                {/* logo */}
                <div css={{
                    color: Theme.colors.white
                }}>
                    <span css={{
                        fontWeight: "100"
                    }}>Ani</span>
                    <span css={{
                        fontWeight: "bold"
                    }}>Browse</span>
                </div>

                {/* collection button */}
                <Button type="primary" css={{
                    backgroundColor: Theme.colors.primary,
                    borderColor: "transparent"
                }}>
                    Collections
                </Button>
            </div>
        </header>
    );
}