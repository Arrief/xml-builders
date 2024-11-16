export default function checkUndefined(e: any): e is undefined {
    return e === undefined || e === 'undefined';
}

export default function checkUndefinedOrNull(e: any): e is (undefined | null) {
    return checkUndefined(e) || e === null || e === 'null';
}

export default function checkUndefinedNullOrEmpty(e: any): e is (undefined | null) {
    if (checkUndefinedOrNull(e)) return true;
    if (Array.isArray(e) && e?.length < 1) return true;
    if (!Array.isArray(e) && typeof e === 'object' && Object.keys(e)?.length < 1) return true;
    if (!Array.isArray(e) && typeof e !== 'object' && (e === '' || e === '""')) return true;
    return false;
};

