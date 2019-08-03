export async function main(ns: IGame) {
    let files = ns.ls('home', '.js');
    for (let f of files) {
        ns.rm(f)
    }
}