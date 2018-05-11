export interface BBConfig {
    characterSlot: number;
    pixelMap: {
        loading: {
            login: {};
            connecting: {};
        };
        avatarSelect: {
            x: number;
            y: number[];
        };
        captcha: {
            clip: { x: number, y: number, w: number, h: number },
            input: { x: number, y: number };
            ok: { x: number, y: number };
        };
        buffBuilder: {
            xOffset: {
                cat: number;
                prop: number;
            };
            categoryLocations: {
                attrib: number;
                combat: number;
                misc: number;
                armor: number;
                trader: number;
            };
            optionLocations: {
                agl: number;
                con: number;
                luck: number;
                prec: number;
                stam: number;
                str: number;
                acr: number;
                crit: number;
                chr: number;
                glance: number;
                xp: number;
                harvest: number;
                healer: number;
                resilience: number;
                flow: number;
                secondChance: number;
                elem: number;
                energy: number;
                kinetic: number;
                assembly: number;
                amazing: number;
                sampling: number;
            };
            acceptButton: { x: number, y: number }
            clear: {
                x: number,
                y: number
            }
        }
    }
}
