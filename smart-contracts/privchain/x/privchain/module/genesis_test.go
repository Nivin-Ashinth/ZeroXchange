package privchain_test

import (
	"testing"

	keepertest "github.com/Vpragadeesh/privchain/testutil/keeper"
	"github.com/Vpragadeesh/privchain/testutil/nullify"
	privchain "github.com/Vpragadeesh/privchain/x/privchain/module"
	"github.com/Vpragadeesh/privchain/x/privchain/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.PrivchainKeeper(t)
	privchain.InitGenesis(ctx, k, genesisState)
	got := privchain.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
