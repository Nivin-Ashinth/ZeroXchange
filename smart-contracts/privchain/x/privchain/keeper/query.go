package keeper

import (
	"github.com/Vpragadeesh/privchain/x/privchain/types"
)

var _ types.QueryServer = Keeper{}
