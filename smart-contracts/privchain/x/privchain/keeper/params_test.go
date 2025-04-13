package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "github.com/Vpragadeesh/privchain/testutil/keeper"
	"github.com/Vpragadeesh/privchain/x/privchain/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.PrivchainKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
