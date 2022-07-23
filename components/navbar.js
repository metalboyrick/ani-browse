/** @jsxImportSource @emotion/react */

import Link from 'next/link';

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
                    padding: "15px 20% 15px 20%",
                    "@media (max-width: 768px)": {
                        paddingLeft: "10%",
                        paddingRight: "10%",
                    }
            }}>
                {/* logo */}
                <Link href={`/`}>
                    <a css={{
                        color: Theme.colors.white,
                        "&:hover": {
                            color: Theme.colors.primary
                        }
                    }}>
                        <span css={{
                            fontWeight: "100"
                        }}>Ani</span>
                        <span css={{
                            fontWeight: "bold"
                        }}>Browse</span>
                    </a>
                </Link>
                
                {/* collection button */}
                <Link href="/collections">
                    <Button type="default" shape="round" style={{
                        backgroundColor: Theme.colors.background,
                        borderColor: Theme.colors.white,
                        color: Theme.colors.white
                    }}>
                        Collections
                    </Button>
                </Link>
                
            </div>
        </header>
    );
}