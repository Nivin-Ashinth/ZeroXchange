package types

const (
	// ModuleName defines the module name
	ModuleName = "privchain"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_privchain"
)

var (
	ParamsKey = []byte("p_privchain")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
