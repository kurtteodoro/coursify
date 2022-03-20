export function az( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
}

export function za( a, b ) {
    if ( a.name > b.name ){
      return -1;
    }
    if ( a.name < b.name ){
      return 1;
    }
    return 0;
}

export function minToMax( a, b ) {
    if ( a.views > b.views ){
        return -1;
    } if ( a.views < b.views ){
        return 1;
    }
    return 0;
}

export function maxToMin( a, b ) {
    if ( a.views < b.views ){
        return -1;
    } if ( a.views > b.views ){
        return 1;
    }
    return 0;
}
