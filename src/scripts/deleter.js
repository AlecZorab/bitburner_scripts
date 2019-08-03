export async function main(ns) {
    let files = ns.ls('home', '.js');
    for (let f of files) {
        ns.rm(f);
    }
}
